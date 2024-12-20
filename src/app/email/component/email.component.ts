import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmailService } from '../service/email.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './email.component.html',
  providers: [EmailService],
})
export class EmailComponent {
  emailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
  ) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.emailForm.valid) {
      return;
    }

    this.emailService.sendEmail(this.emailForm.value).subscribe({
      next: () => alert('Email sent successfully!'),
      error: (err) => alert(`Error sending email: ${err.message}`),
    });
  }
}
