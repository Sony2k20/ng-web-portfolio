import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-hamburger-menu',
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css',
})
export class HamburgerMenuComponent {
  @Input() isChecked = false

  toggleHamburger() {
    this.isChecked = !this.isChecked
  }
}
