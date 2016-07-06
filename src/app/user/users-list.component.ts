// ```
// User-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// User-list.component.js may be freely distributed under the MIT license
// ```

// # Recipe List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {UsersService} from './Users.service';
import {User} from './Users.store';
import {AppStore} from '../app.store';

@Component({
  selector: 'users-list',
  template: require('./users-list.html'),
})
export class UsersList {
  // The `User` component hands off `Users` and `selectedUser`
  // via property bindings to its child components
  // Here we pick up the `Users` collection by annotating our local
  // `Users` property with `@Input()`
  @Input() users: User[];
  // Two event outputs for when a User is selected or deleted
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
