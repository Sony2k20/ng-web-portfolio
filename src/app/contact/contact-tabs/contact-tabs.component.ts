import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-tabs',
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTabsComponent {
  activeTab: string = 'coaching';

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
