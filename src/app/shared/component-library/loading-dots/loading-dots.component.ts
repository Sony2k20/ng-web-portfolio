import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loading-dots',
  imports: [CommonModule],
  templateUrl: './loading-dots.component.html',
  styleUrl: './loading-dots.component.css',
})
export class LoadingDotsComponent {
  @Input() additionalClasses: string = ''
}
