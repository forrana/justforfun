// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```

// # Recipe Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class GalleryService {
    private _fileApi = '/api/files';
    galleries: Array<any>;
  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {
  }

  loadGallerys() {
      return this.http.get(this._fileApi);
    }

}
