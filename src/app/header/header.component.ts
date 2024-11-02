import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HamburgerMenuComponent } from '../shared/components/hamburger-menu/hamburger-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HamburgerMenuComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private viewportScroller = inject(ViewportScroller);

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
