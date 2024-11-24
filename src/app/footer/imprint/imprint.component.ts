import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../footer.component';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './imprint.component.html',
  styleUrls: ['./test.css'],
})
export class ImprintComponent implements AfterViewInit {
  private masks: string[] = [
    'M',
    'a',
    'r',
    'k-1',
    'k-2',
    'e',
    't-line-v',
    't-line-h',
    'i-2',
    'i-dot',
    'n',
    'g',
    'lab-l',
    'lab-a',
    'lab-b',
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.masks.forEach((mask) => {
      const id = `#mask-${mask}`;
      const path = this.el.nativeElement.querySelector(id) as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        this.renderer.setStyle(path, 'strokeDasharray', length);
        this.renderer.setStyle(path, 'strokeDashoffset', length);
      }
    });
  }
}
