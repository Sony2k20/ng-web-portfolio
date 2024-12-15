import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from '../shared/components/hamburger-menu/hamburger-menu.component';
import { Router, RouterModule } from '@angular/router';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HamburgerMenuComponent, CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  scroller = inject(ScrollToSectionService);

  isMenuOpen = false;
  isElementVisible = false;
  isScrolled = false;

  isSmallScreen = false;

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  //toDo - use gsap as scroll indicator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position
    const scrollDistance =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Set the class based on scroll distance (e.g., 100px)
    this.isScrolled = scrollDistance > 100;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isElementVisible = true;
    } else {
      setTimeout(() => {
        this.isElementVisible = false;
      }, 900);
    }
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
  }

  scrollToSection(route: string, sectionId: string, event?: Event) {
    this.scroller.scrollToSection(route, sectionId, event);

    this.toggleMenu()
  }
}
