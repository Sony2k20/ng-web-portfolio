import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailPayload, EmailService } from '../shared/services/email.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { finalize, forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
import { SnackbarService } from '../shared/components/snackbar/service/snackbar.service';
import { MainButtonComponent } from '../shared/components/main-button/main-button.component';
import { LoadingDotsComponent } from '../shared/components/loading-dots/loading-dots.component';

@Component({
    selector: 'app-email',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent,
        MainButtonComponent,
        LoadingDotsComponent,
    ],
    templateUrl: './contact.component.html',
    providers: [EmailService]
})
export class ContactComponent implements OnInit {
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
          Validators.maxLength(20),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
          Validators.maxLength(20),
        ],
      ],
      to: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
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
      subject: 'Bestätigung der Kontaktanfrage an Katharina Niesche',
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
}
