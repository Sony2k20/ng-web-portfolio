import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { forkJoin, finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SnackbarService } from '../../shared/component-library/snackbar/service/snackbar.service';
import {
  EmailService,
  EmailPayload,
} from '../../shared/services/email.service';
import { MainButtonComponent } from '../../shared/component-library/main-button/main-button.component';
import { LoadingDotsComponent } from '../../shared/component-library/loading-dots/loading-dots.component';

@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainButtonComponent,
    LoadingDotsComponent,
  ],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  activeTab: string = 'coaching';

  emailForm: FormGroup;
  isLoading = false;

  private fb = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);
  private emailService = inject(EmailService);
  private emailConfirmationTemplate: string = '';
  private emailInquiryTemplate: string = '';

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
      challenge: ['', Validators.required],
      blockage: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.emailService
      .getTemplate('email-confirmation-template.html')
      .subscribe({
        next: (content) => {
          this.emailConfirmationTemplate = content;
        },
        error: () => {
          console.log('Error loading email template');
        },
      });
    this.emailService.getTemplate('email-inquiry-template.html').subscribe({
      next: (content) => {
        this.emailInquiryTemplate = content;
      },
      error: () => {
        console.log('Error loading email template');
      },
    });
  }

  onSubmit() {
    console.log(this.emailForm.controls['message']);

    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formattedMessage = this.emailForm
      .get('message')
      ?.value.replace(/\n/g, '<br>');

    const emailConfirmationTemplate = this.replacePlaceholder(
      this.emailConfirmationTemplate,
      {
        firstName: this.emailForm.get('firstName')?.value,
        message: formattedMessage,
      },
    );

    const emailInquiryTemplate = this.replacePlaceholder(
      this.emailInquiryTemplate,
      {
        firstName: this.emailForm.get('firstName')?.value,
        surname: this.emailForm.get('surname')?.value,
        to: this.emailForm.get('to')?.value,
        message: formattedMessage,
      },
    );

    const confirmationEmail: EmailPayload = {
      fromName: 'Katharina Niesche',
      to: this.emailForm.get('to')?.value,
      subject: 'Bestätigung der Kontaktanfrage an Katharina',
      text: '',
      html: emailConfirmationTemplate,
    };

    const inquiryEmail: EmailPayload = {
      fromName: 'Website Kontaktanfrage',
      to: environment.emailAdress,
      subject: `Website Kontaktanfrage von ${this.emailForm.get('firstName')?.value} ${this.emailForm.get('surname')?.value}`,
      text: '',
      html: emailInquiryTemplate,
    };

    this.sendMail(confirmationEmail, inquiryEmail);
  }

  private replacePlaceholder(
    template: string,
    values: { [key: string]: string },
  ): string {
    let updatedTemplate = template;

    for (const [key, value] of Object.entries(values)) {
      const placeholder = `{{ ${key} }}`;
      updatedTemplate = updatedTemplate.replace(
        new RegExp(placeholder, 'g'),
        value,
      );
    }
    return updatedTemplate;
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
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Die Kontaktanfrage war erfolgreich.',
          );
          this.emailForm.reset();
        },
        error: () => {
          this.snackbarService.showSnackbar(
            'Die Kontaktanfrage ist fehlgeschlagen! Versuchen Sie es später erneut.',
          );
        },
      });
  }

  switchTab(tab: string) {
    this.activeTab = tab;

    if (this.activeTab === 'coaching') {
      this.toggleRequired('message', false);
      this.toggleRequired('challenge', true);
      this.toggleRequired('blockage', true);
    }
    if (this.activeTab === 'general') {
      this.toggleRequired('message', true);
      this.toggleRequired('challenge', false);
      this.toggleRequired('blockage', false);
    }
    this.emailForm.markAsUntouched();
  }

  toggleRequired(formControlName: string, isRequired: boolean) {
    const nameControl = this.emailForm.get(formControlName);
    if (isRequired) {
      nameControl?.setValidators(Validators.required);
    } else {
      nameControl?.clearValidators();
    }
    nameControl?.updateValueAndValidity();
  }
}
