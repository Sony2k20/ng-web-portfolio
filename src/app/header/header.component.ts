import { Component, inject } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HamburgerMenuComponent } from '../shared/components/hamburger-menu/hamburger-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HamburgerMenuComponent, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);

  isMenuOpen = false; // or whatever logic you use to open/close the menu
  isElementVisible = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isElementVisible = true;
    } else {
      setTimeout(() => {
        this.isElementVisible = false;
      }, 600);
    }
  }

  scrollToSection(sectionId: string) {
    this.router.navigate(['/']);
    setTimeout(() => {
      this.toggleMenu();
      this.viewportScroller.scrollToAnchor(sectionId);
    }, 50);
  }
}
