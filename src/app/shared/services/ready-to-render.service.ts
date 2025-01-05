import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadyToRenderService {
  heroImageRdy$ = new BehaviorSubject<boolean>(false);
}
