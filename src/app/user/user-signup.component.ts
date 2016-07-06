// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// User.component.js may be freely distributed under the MIT license
// ```

// # User Component

import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import {Router} from 'angular2/router';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {UsersService} from './users.service';
import {User} from './users.store';

@Component({
  selector: 'user-signup',
  template: require('./user-signup.html'),
})

export class Signup {
    statusMessage: string;
    router: Router;
    constructor(private usersService: UsersService,
                _router: Router) {
        this.router = _router;
    }

    signup(username, password, email) {
        console.log(username, password);
        this.usersService
        .signup(username, password, email)
        .subscribe(
          success => this.router.parent.navigate(['/Login']),
          error =>  this.statusMessage = <any>error.text()
        );
    }
}
