// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from './users.store';
import {AppState} from '../app.service';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/X-www-form-urlencoded'
  })
};

@Injectable()
export class UsersService {

  Users: Observable<Array<User>>;


  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http,
              private appState: AppState) {

    // Bind an observable of our `Users` to `UserService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    // this.user = store.select('Users');
  }

  private _loginApi = '/api/login';
  private _fileApi = '/api/files';

  private handleError (error: Response) : Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    if (error.status == 401) return Observable.of(error);
    return Observable.throw(error || "Server Error");
  }

  logger(text) {
      console.log('text:');
      console.log(text);
  }

  getFilesListByCategory(category) {
        let headers = new Headers();

        return this.http.get(this._fileApi)
            .map((res: Response) => res)
            .subscribe(
              success => console.log(success.text()),
              error =>  console.log(<any>error.text())
            );
  }

  signup(username, password, email) {
        let body = JSON.stringify({'username': username, 'password': password, 'email': email});
        let headers = new Headers();
        var creds = `username=${username}&password=${password}&email=${email}`;

        return this.http.post('/api/auth/signup', creds, HEADER)
            .map((res: Response) => res)
    }

    login(username, password) {
          let body = JSON.stringify({'username': username, 'password': password});
          let headers = new Headers();
          var creds = `username=${username}&password=${password}`;

          return this.http.post('/api/auth/login', creds, HEADER)
              .map((res: Response) => res)
    }

    logout(username, password) {
        this.http.post('/api/auth/logout', '', HEADER)
            .map((res: Response) => res)
            .subscribe(
              success => {
                  console.log(success.text());
                  this.appState.set('isLoggedIn', false);
              },
              error =>  console.log(<any>error.text())
            );
    }

    isLoggedIn() {

          return this.http.get('/api/auth/loggedin')
              .map((res: Response) => res)
    }

    getCurrentUser() {
          return this.http.get('/api/auth/user')
              .map((res: Response) => res)
    }

}
