import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HamburgerMenuComponent } from '../../component-library/hamburger-menu/hamburger-menu.component'
import { Router, RouterModule } from '@angular/router'
import { ScrollToSectionService } from '../../services/scroll-to-section.service'
import { ScrollTriggerHeaderService } from '../../services/scroll-trigger-header.service'
import { Contact } from '../../enums/contact.enum'
import { Routes } from '../../enums/routes.enum'

@Component({
  selector: 'app-header',
  imports: [HamburgerMenuComponent, CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @ViewChild('start', { static: false }) start!: ElementRef
  routes = Routes
  contact = Contact
  isMenuOpen = false
  isElementVisible = false
  isScrolled = false
  isSmallScreen = false

  scroller = inject(ScrollToSectionService)
  router = inject(Router)

  private scrollTriggerHeaderService = inject(ScrollTriggerHeaderService)

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize()
  }

  ngOnInit() {
    this.checkScreenSize()

    setTimeout(() => {
      //to-Do refactor without set timeout
      document.querySelector('#start')!.classList.remove('slideInFromTop')
      this.scrollTriggerHeaderService.initScrollTriggers()
    }, 1000)
  }

  //toDo - use gsap as scroll indicator
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position
    const scrollDistance =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    // Set the class based on scroll distance (e.g., 100px)
    this.isScrolled = scrollDistance > 100
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    if (this.isMenuOpen) {
      this.isElementVisible = true
    } else {
      setTimeout(() => {
        this.isElementVisible = false
      }, 900)
    }
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024
  }

  scrollToSection(route: string, sectionId: string, event?: Event) {
    if (this.isMenuOpen) {
      this.toggleMenu()
      setTimeout(() => {
        this.scroller.scrollToSection(route, sectionId, event)
      }, 400)
    } else this.scroller.scrollToSection(route, sectionId, event)
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route
  }
}
