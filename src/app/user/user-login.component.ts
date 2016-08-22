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
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {Router} from 'angular2/router';
import * as io from 'socket.io-client'

import {UsersService} from './users.service';
import {User} from './users.store';

import {AppState} from '../app.service';

@Component({
  selector: 'user-login',
  template: require('./user-login.html'),
})

export class Login {
    statusMessage: string;
    router: Router;

    constructor(private usersService: UsersService,
                private appState: AppState,
                _router: Router) {
        this.router = _router;
    }

    login(username, password) {
        let socket = io();

        socket.connect();
        socket.emit('hello', 'hello');
        this.usersService
        .login(username, password)
        .subscribe(
          success => {
              this.router.parent.navigate(['/Projects']);
              this.appState.set('isLoggedIn', true);
          },
          error =>  {
              this.statusMessage = <any>error.text(); console.log(error)
          }
        );
    }

    openSignup() {
        this.router.parent.navigate(['/Signup']);
    }

    isLoggedIn() {
        this.usersService
            .isLoggedIn()
            .subscribe(
              success => this.statusMessage = success.text(),
              error =>  this.statusMessage = <any>error.text()
            );
    }

    getCureentUser() {
        this.usersService
            .getCurrentUser()
            .subscribe(
              success => this.statusMessage = success.text(),
              error =>  this.statusMessage = <any>error.text()
            );
    }
}
