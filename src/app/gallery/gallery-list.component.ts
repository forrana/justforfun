// ```
// expense-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// expense-list.component.js may be freely distributed under the MIT license
// ```

// # Recipe List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {GalleryService} from './gallery.service';
import {AppStore} from '../app.store';

@Component({
  selector: 'gallery-list',
  template: require('./gallery-list.html'),
})
export class GalleryList {
  // The `expense` component hands off `expenses` and `selectedexpense`
  // via property bindings to its child components
  // Here we pick up the `expenses` collection by annotating our local
  // `expenses` property with `@Input()`
  @Input() galleries: Array<any>;
  // Two event outputs for when a expense is selected or deleted
}
