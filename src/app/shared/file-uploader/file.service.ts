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

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/X-www-form-urlencoded'
  })
};

@Injectable()
export class FileService {

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http) {

    // Bind an observable of our `Users` to `UserService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    // this.user = store.select('Users');
  }

  private _fileApi = '/api/files';
  public files;

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
            .map((files: any) => this.files = files)
            .map((file) => console.log(file));
    }
}
