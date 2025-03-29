import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core'
import { ContactFormComponent } from '../contact-form/contact-form.component'
import { ContactCalendlyComponent } from '../contact-calendly/contact-calendly.component'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-contact-tabs',
  imports: [CommonModule, ContactFormComponent, ContactCalendlyComponent],
  templateUrl: './contact-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTabsComponent implements OnInit {
  @Input() activeTab: string = 'coaching'

  private router = inject(ActivatedRoute)

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 'coaching'
    })
  }

  switchTab(tab: string) {
    this.activeTab = tab
  }
}
