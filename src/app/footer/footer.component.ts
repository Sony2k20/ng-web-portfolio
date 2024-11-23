import { Component, inject } from '@angular/core';
import { SocialLinksComponent } from '../shared/components/social-links/social-links.component';
import { Router, RouterModule } from '@angular/router';
import { Routes } from '../shared/enums/routes.enum';
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  routes = Routes;
  scroller = inject(ScrollToSectionService);
  private router = inject(Router);
}
