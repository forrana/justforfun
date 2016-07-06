// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// User.component.js may be freely distributed under the MIT license
// ```

// # User Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {UsersService} from './Users.service';
import {User} from './Users.store';
import {AppStore} from '../app.store';

@Component({
  selector: 'users-detail',
  template: require('./users-details.html'),
})
export class UserDetails {

  originalTitle: string;
  selectedUser: User;

  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  @Input('User') set _User(value: User) {

    if (value) this.originalTitle = value.name;
    this.selectedUser = Object.assign({}, value);

    // DEBUG
    console.log('this.selectedUser: ');
    console.log(this.selectedUser);
  }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }
}
