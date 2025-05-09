import { CommonModule } from '@angular/common'
import { Component, DestroyRef, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { LoadingDotsComponent } from '../../shared/component-library/loading-dots/loading-dots.component'
import { MainButtonComponent } from '../../shared/component-library/main-button/main-button.component'
import { forkJoin, finalize } from 'rxjs'
import { environment } from '../../../environments/environment'
import { SnackbarService } from '../../shared/component-library/snackbar/service/snackbar.service'
import { EmailService, EmailPayload } from '../../shared/services/email.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainButtonComponent,
    LoadingDotsComponent,
  ],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  emailForm: FormGroup
  isLoading = false
  private destroyRef = inject(DestroyRef)

  private fb = inject(FormBuilder)
  private snackbarService = inject(SnackbarService)
  private emailService = inject(EmailService)
  private emailConfirmationTemplate: string = ''
  private emailInquiryTemplate: string = ''

  constructor() {
    this.emailForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(30),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(30),
        ],
      ],
      to: ['', [Validators.required, Validators.email]],
      message: [''],
    })
  }

  ngOnInit(): void {
    this.emailService
      .getTemplate('email-confirmation-template.html')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (content) => {
          this.emailConfirmationTemplate = content
        },
        error: () => {
          console.log('Error loading email template')
        },
      })
    this.emailService
      .getTemplate('email-inquiry-template.html')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (content) => {
          this.emailInquiryTemplate = content
        },
        error: () => {
          console.log('Error loading email template')
        },
      })
  }

  onSubmit() {
    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched()

      return
    }

    this.isLoading = true

    const formattedMessage = this.emailForm
      .get('message')
      ?.value.replace(/\n/g, '<br>')

    const emailConfirmationTemplate = this.replacePlaceholder(
      this.emailConfirmationTemplate,
      {
        firstName: this.emailForm.get('firstName')?.value,
        message: formattedMessage,
      },
    )

    const emailInquiryTemplate = this.replacePlaceholder(
      this.emailInquiryTemplate,
      {
        firstName: this.emailForm.get('firstName')?.value,
        surname: this.emailForm.get('surname')?.value,
        to: this.emailForm.get('to')?.value,
        message: formattedMessage,
      },
    )

    const confirmationEmail: EmailPayload = {
      fromName: 'Katharina Niesche',
      to: this.emailForm.get('to')?.value,
      subject: 'Bestätigung der Kontaktanfrage an Katharina',
      text: '',
      html: emailConfirmationTemplate,
    }

    const inquiryEmail: EmailPayload = {
      fromName: 'Website Kontaktanfrage',
      to: environment.emailAdress,
      subject: `Website Kontaktanfrage von ${this.emailForm.get('firstName')?.value} ${this.emailForm.get('surname')?.value}`,
      text: '',
      html: emailInquiryTemplate,
    }

    this.sendMail(confirmationEmail, inquiryEmail)
  }

  private replacePlaceholder(
    template: string,
    values: { [key: string]: string },
  ): string {
    let updatedTemplate = template

    for (const [key, value] of Object.entries(values)) {
      const placeholder = `{{ ${key} }}`
      updatedTemplate = updatedTemplate.replace(
        new RegExp(placeholder, 'g'),
        value,
      )
    }
    return updatedTemplate
  }

  private sendMail(
    confirmationEmail: EmailPayload,
    inquiryEmail: EmailPayload,
  ) {
    forkJoin([
      this.emailService.sendEmail(confirmationEmail),
      this.emailService.sendEmail(inquiryEmail),
    ])
      .pipe(
        finalize(() => {
          this.isLoading = false
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Die Kontaktanfrage war erfolgreich.',
          )
          this.emailForm.reset()
        },
        error: () => {
          this.snackbarService.showSnackbar(
            'Die Kontaktanfrage ist fehlgeschlagen! Versuchen Sie es später erneut.',
          )
        },
      })
  }
}
