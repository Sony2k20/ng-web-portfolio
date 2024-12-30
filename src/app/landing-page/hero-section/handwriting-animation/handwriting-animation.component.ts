import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-handwriting-animation',
  standalone: true,
  imports: [],
  templateUrl: './handwriting-animation.component.html',
  styleUrl: './handwriting-animation.component.css',
})
export class HandwritingAnimationComponent implements AfterViewInit {
  @ViewChildren('maskPath') maskPaths?: QueryList<SVGPathElement>;
  masks = [
    'erfolg-erfol',
    'erfolg-g',
    'beginnt',
    'beginnt-point',
    'in',
    'in-point',
    'dir-d',
    'dir-ir',
    'dir-point',
  ];

  ngAfterViewInit(): void {
    this.masks.forEach((mask) => {
      const id = `#mask-${mask}`;
      const path = document.querySelector(id) as SVGPathElement;

      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length.toString();
        path.style.strokeDashoffset = length.toString();
      }
    });
  }
}
