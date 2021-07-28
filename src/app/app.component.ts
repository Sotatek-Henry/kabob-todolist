import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  currentTime$: Observable<string> = timer(0, 1000).pipe(
    map(() => moment().format('YYYY-MM-DD HH:mm:ss'))
  );
}
