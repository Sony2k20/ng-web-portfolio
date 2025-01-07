import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import FontFaceObserver from 'fontfaceobserver';

@Injectable({
  providedIn: 'root',
})
export class ReadyToRenderService {
  heroImageRdy$ = new BehaviorSubject<boolean>(false);
  fontRdy$ = new BehaviorSubject<boolean>(false);

  loadFont() {
    const eyesomeFont = new FontFaceObserver('Eyesome', {
      weight: 100,
    });

    eyesomeFont
      .load()
      .then(() => {
        this.fontRdy$.next(true);
      })
      .catch((error) => {
        console.error('Font failed to load', error);
      });
  }
}
