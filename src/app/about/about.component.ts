import { Component, inject } from '@angular/core'
import { FooterComponent } from '../shared/components/footer/footer.component'
import { HeaderComponent } from '../shared/components/header/header.component'
import { CommonModule } from '@angular/common'
import { Contact } from '../shared/enums/contact.enum'
import { ReadyToRenderService } from '../shared/services/ready-to-render.service'
import { ScrollToSectionService } from '../shared/services/scroll-to-section.service'

@Component({
  selector: 'app-about',
  imports: [FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  contact = Contact
  readyToRenderService = inject(ReadyToRenderService)

  private scrollToSectionService = inject(ScrollToSectionService)

  ngAfterViewInit(): void {
    this.scrollToSectionService.viewInitDone$.next(true)
  }

  onImageLoad(event: Event): void {
    this.readyToRenderService.aboutImageRdy$.next(true)
  }
}
