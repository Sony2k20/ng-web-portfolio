import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

//toDo refactor preloading

export const imgLandingPageResolver: ResolveFn<string> = () => {
  return of('../../../assets/images/small-a.jpg');
};
