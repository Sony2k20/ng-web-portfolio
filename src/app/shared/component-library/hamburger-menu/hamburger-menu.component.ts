import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-hamburger-menu',
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './hamburger-menu.component.css',
})
export class HamburgerMenuComponent {
  @Input() isChecked = false

  toggleHamburger() {
    this.isChecked = !this.isChecked
  }
}
