import { Component } from '@angular/core';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../footer.component';
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
})
export class PrivacyPolicyComponent {}
