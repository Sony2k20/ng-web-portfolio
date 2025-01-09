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
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-tabs',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainButtonComponent,
    LoadingDotsComponent,
    ContactFormComponent,
  ],
  templateUrl: './contact-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTabsComponent {
  activeTab: string = 'coaching';

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
