import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ContactFormComponent } from '../contact-form/contact-form.component'
import { ContactCalendlyComponent } from '../contact-calendly/contact-calendly.component'

@Component({
  selector: 'app-contact-tabs',
  imports: [CommonModule, ContactFormComponent, ContactCalendlyComponent],
  templateUrl: './contact-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTabsComponent {
  @Input() activeTab: string = 'coaching'

  switchTab(tab: string) {
    this.activeTab = tab
  }
}
