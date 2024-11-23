import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const imgLandingPageResolver: ResolveFn<string> = () => {
  return of('../../../assets/images/small-a.jpg');
};
