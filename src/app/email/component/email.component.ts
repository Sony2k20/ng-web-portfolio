import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailPayload, EmailService } from '../service/email.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    MatSnackBarModule,
  ],
  templateUrl: './email.component.html',
  providers: [EmailService],
})
export class EmailComponent {
  emailForm: FormGroup;

  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);
  private snackBar = inject(MatSnackBar);

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

  onSubmit() {
    if (!this.emailForm.valid) {
      return;
    }

    const message = this.emailForm.get('message')?.value;
    const formattedMessage = message.replace(/\n/g, '<br>');

    const confirmationEmail: EmailPayload = {
      fromName: 'Katharina Niesche',
      to: this.emailForm.get('to')?.value,
      subject: 'Bestätigung der Kontaktanfrage an Katharina Niesche',
      text: '',
      html: `Hallo ${this.emailForm.get('firstName')?.value}, 
      <br> vielen Dank für deine Kontaktanfrage. Ich werde mich sobald es geht bei dir melden.
      <br> Mit freudnlichen Grüßen <br> Deine Katharina <br><br>
      Deine Originalanfrage: <br>
      ${formattedMessage}`,
    };

    const inquiryEmail: EmailPayload = {
      fromName: 'Website Kontaktanfrage',
      to: 'contact@csnguyen.de',
      subject: `Website Kontaktanfrage von ${this.emailForm.get('fromName')?.value} ${this.emailForm.get('surname')?.value}`,
      text: '',
      html: `Anfrage von ${this.emailForm.get('firstName')?.value} ${this.emailForm.get('surname')?.value} ${this.emailForm.get('to')?.value}
      <br><br>${formattedMessage}`,
    };

    forkJoin([
      this.emailService.sendEmail(confirmationEmail),
      this.emailService.sendEmail(inquiryEmail),
    ]).subscribe({
      next: () => {
        this.snackBar.open('Die Kontaktanfrage war erfolgreich!', 'Close', {
          duration: 5000,
        });
        this.emailForm.reset();
      },
      error: () => {
        this.snackBar.open(
          'Die Kontaktanfrage ist fehlgeschlagen! Versuchen Sie es später erneut',
          'Close',
          {
            duration: 5000,
          },
        );
      },
    });
  }
}
