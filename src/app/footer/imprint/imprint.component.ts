import { Component } from '@angular/core';

import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../footer.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './imprint.component.html',
})
export class ImprintComponent {}
