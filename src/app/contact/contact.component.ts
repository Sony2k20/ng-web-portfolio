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
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-email',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,

    ContactFormComponent,
  ],
  templateUrl: './contact.component.html',
  providers: [EmailService],
})
export class ContactComponent {}
