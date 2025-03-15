import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core'
import { IntersectionObserverService } from '../../shared/services/intersection-observer-service.service'
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { SnackbarService } from '../../shared/component-library/snackbar/service/snackbar.service'
import { EmailPayload, EmailService } from '../../shared/services/email.service'
import { CommonModule } from '@angular/common'
import { LoadingDotsComponent } from '../../shared/component-library/loading-dots/loading-dots.component'
import { MainButtonComponent } from '../../shared/component-library/main-button/main-button.component'
import { HttpClientModule } from '@angular/common/http'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs'

@Component({
  selector: 'app-workbook',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainButtonComponent,
    LoadingDotsComponent,
    HttpClientModule,
  ],
  templateUrl: './workbook.component.html',
  providers: [EmailService],
})
export class WorkbookComponent implements AfterViewInit {
  private elementRef = inject(ElementRef)
  private intersectionObserverService = inject(IntersectionObserverService)

  emailForm: FormGroup
  isLoading = false
  private destroyRef = inject(DestroyRef)

  private fb = inject(FormBuilder)
  private snackbarService = inject(SnackbarService)
  private emailWorkbookTemplate: string = ''
  private emailService = inject(EmailService)

  constructor() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngAfterViewInit() {
    this.intersectionObserverService.observeElements(
      this.elementRef,
      'animate-visible',
      'animate',
    )
  }

  onSubmit() {
    if (!this.emailForm.valid) {
      this.emailForm.markAllAsTouched()

      return
    }
    this.isLoading = true

    const confirmationEmail: EmailPayload = {
      fromName: 'Katharina Niesche',
      to: this.emailForm.get('email')?.value,
      subject: 'Dein Workbook',
      text: '',
      html: this.emailWorkbookTemplate,
    }

    this.emailService
      .getTemplate('email-workbook.html')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((content) => {
          this.emailWorkbookTemplate = content
          return this.emailService.sendWorkbook(confirmationEmail)
        }),
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSnackbar(
            'Das Workbook wurde erfolgreich verschickt.',
          )
          this.emailForm.reset()
        },
        error: (err) => {
          this.snackbarService.showSnackbar(
            'Das Workbook konnte nicht verschickt werden! Versuchen Sie es später erneut.',
          )
        },
      })
    this.isLoading = false
  }
}
