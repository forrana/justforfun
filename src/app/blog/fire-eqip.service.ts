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

import {FireEqip} from './fire-eqip.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FireEqipService {

  eqips: Observable<Array<FireEqip>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `expenses` to `ExpenseService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.eqips = store.select('eqips');
  }

  loadFireEqips() {

        this.http.get('/api/eqip')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_FIREEQIP', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveFireEqip(eqip: FireEqip) {

        (eqip._id) ? this.updateFireEqip(eqip) : this.createFireEqip(eqip);
    }

    createFireEqip(eqip: FireEqip) {

        this.http.post('/api/eqip', JSON.stringify(eqip), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_FIREEQIP', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateFireEqip(eqip: FireEqip) {

        this.http.put(`/api/eqip/${eqip._id}`, JSON.stringify(eqip), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_FIREEQIP', payload: eqip }));
    }

    deleteFireEqip(eqip: FireEqip) {

        this.http.delete(`/api/eqip/${eqip._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_FIREEQIP', payload: eqip }));
    }
}
