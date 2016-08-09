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

import {FeedbackService} from './feedback.service';
import {Feedback} from './feedback.store';
import {AppStore} from '../app.store';

@Component({
  selector: 'feedback-list',
  template: require('./feedback-list.html'),
})
export class FeedbackList {
  // The `expense` component hands off `expenses` and `selectedexpense`
  // via property bindings to its child components
  // Here we pick up the `expenses` collection by annotating our local
  // `expenses` property with `@Input()`
  @Input() feedbacks: Feedback[];
  @Input() readOnly: Boolean;
  @Input() limit: Number;
  // Two event outputs for when a expense is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
