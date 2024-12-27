import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  @Input() type: string = '';
  @Input() text: string = '';
  @Input() additionalClasses: string = '';
  @Input() isDisabled: boolean = false;
}
