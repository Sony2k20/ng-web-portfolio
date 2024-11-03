import { Component } from '@angular/core';
import { SocialLinksComponent } from '../shared/components/social-links/social-links.component';
import { RouterModule } from '@angular/router';
import { Routes } from '../shared/enums/routes.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  routes = Routes;
}
