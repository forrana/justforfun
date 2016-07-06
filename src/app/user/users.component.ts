// ```
// Users.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```

// # Users Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {User} from './users.store';
import {UsersService} from './users.service';
import {UserDetails} from './user-details.component';
import {UsersList} from './users-list.component';

@Component({
  selector: 'users',
  providers: [],
  template: require('./Users.html'),
  directives: [UsersList, UserDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Users {

  Users: Observable<Array<User>>;

  selectedUser: Observable<User>;

  constructor(private UsersService: UsersService
             ) {

    // Bind to the `recipes` observable on `RecipeService`

  }

}
