import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  loadFont(fontName: string, fontUrl: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const font = new FontFace(fontName, `url(${fontUrl})`);
      font
        .load()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          console.error('Font loading failed', error);
          reject(false);
        });
    });
  }
}
