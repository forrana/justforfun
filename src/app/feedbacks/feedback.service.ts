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

import {Feedback} from './feedback.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FeedbackService {

  feedbacks: Observable<Array<Feedback>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `expenses` to `ExpenseService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.feedbacks = store.select('feedbacks');
  }

  loadFeedbacks() {
        this.http.get('/api/feedback')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(payload => ({ type: 'ADD_FEEDBACK', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveFeedback(feedback: Feedback) {
        (feedback._id) ? this.updateFeedback(feedback) : this.createFeedback(feedback);
    }

    createFeedback(feedback: Feedback) {
        this.http.post('/api/feedback', JSON.stringify(feedback), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_FEEDBACK', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateFeedback(feedback: Feedback) {
        this.http.put(`/api/feedback/${feedback._id}`, JSON.stringify(feedback), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_FEEDBACK', payload: feedback }));
    }

    deleteFeedback(feedback: Feedback) {

        this.http.delete(`/api/feedback/${feedback._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_FEEDBACK', payload: feedback }));
    }
}
