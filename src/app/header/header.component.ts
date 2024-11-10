import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HamburgerMenuComponent } from '../shared/components/hamburger-menu/hamburger-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HamburgerMenuComponent, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);

  isMenuOpen = false; // or whatever logic you use to open/close the menu
  isElementVisible = false;
  isScrolled = false;

  isSmallScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
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
      }, 1000);
    }
  }

  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/']);
    setTimeout(() => {
      document.querySelector('#' + sectionId)!.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Aligns the top of the element to the top of the viewport
      });

      this.isMenuOpen = false;
      this.isElementVisible = false;
    }, 50);
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
  }
}
