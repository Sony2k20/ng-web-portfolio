import { of } from 'rxjs';
import { FontService } from '../services/font.service';
import { ResolveFn } from '@angular/router';

//ToDo this is not working
// export function resolveFont: ResolveFn<string> = () => {
//   return of('../../../assets/images/small-a.jpg');
// };

export const resolveFont: ResolveFn<string> = () => {
  return of('../../../assets/fonts/Eyesome/EyesomeScript.otf');
};

// const fontService = new FontService();
// return fontService.loadFont(
//   'MyFont',
//   '../../../assets/fonts/Eyesome/EyesomeScript.otf',
// );
//   return of('../../../assets/images/small-a.jpg');
// }
