import { Component } from '@angular/core';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../footer.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './imprint.component.html',
  styleUrls: ['./test.css'],
})
export class ImprintComponent {}
