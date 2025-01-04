import { Component } from '@angular/core';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { Contact } from '../shared/enums/contact.enum';

@Component({
    selector: 'app-imprint',
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './imprint.component.html'
})
export class ImprintComponent {
  contact = Contact;
}
