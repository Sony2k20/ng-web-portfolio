import { CommonModule } from '@angular/common'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-main-button',
  imports: [CommonModule],
  templateUrl: './main-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  @Input() type: string = ''
  @Input() text: string = ''
  @Input() additionalClasses: string = ''
  @Input() isDisabled: boolean = false
}
