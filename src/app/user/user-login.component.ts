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
import {FileService} from './file.service';
import {User} from './users.store';

@Component({
  selector: 'user-login',
  template: require('./user-login.html'),
})

export class Login {
    statusMessage: string;
    router: Router;

    constructor(private usersService: UsersService,
                _router: Router) {
        this.router = _router;
        this.usersService.getFilesListByCategory('def');
    }

    login(username, password) {
        let socket = io();

        socket.connect();
        socket.emit('hello', 'hello');
        this.usersService
        .login(username, password)
        .subscribe(
          success => this.router.parent.navigate(['/Expenses']),
          error =>  {this.statusMessage = <any>error.text(); console.log(error)}
        );
        this.usersService.getFilesListByCategory('def');

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
