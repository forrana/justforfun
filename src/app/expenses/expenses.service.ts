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

import {Expense} from './expenses.store';
import {AppStore} from '../app.store';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ExpensesService {

  expenses: Observable<Array<Expense>>;

  // Inject the `AppStore` into the constructor with a type of `AppStore`
  constructor(private http: Http, private store: Store<AppStore>) {

    // Bind an observable of our `expenses` to `ExpenseService`
    // Since this is essentially a `key, value` system, we can
    // set our `recipes` by calling `store.select('recipes')`
    this.expenses = store.select('expenses');
  }

  loadExpenses() {

        this.http.get('/api/expense')
            // map the `HTTP` response from `raw` to `JSON` format
            // using `RxJs`
            // Reference: https://github.com/Reactive-Extensions/RxJS
            .map(res => res.json())
            // call `map` again to create the object we want to dispatch
            // to our reducer
            // This combo of `map` method calls is an observable sequence
            // in that every result gets passed through this sequence of
            // operations
            .map(res =>
                 res.map(expense => {
                        expense.date = new Date(expense.date).toISOString().slice(0, 10);
                        return expense;
                 })
            )
            .map(payload => ({ type: 'ADD_EXPENSE', payload }))
            // Subscribe to this sequence and hand off control to the
            // reducer by dispatching the transformed results
            .subscribe(action => this.store.dispatch(action));
    }

    saveExpense(expense: Expense) {

        (expense._id) ? this.updateExpense(expense) : this.createExpense(expense);
    }

    createExpense(expense: Expense) {

        this.http.post('/api/expense', JSON.stringify(expense), HEADER)
            .map(res => res.json())
            .map(res => {
                 res.date = new Date(res.date).toISOString().slice(0, 10);
                 return res;
            })
            .map(payload => ({ type: 'CREATE_EXPENSE', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateExpense(expense: Expense) {

        this.http.put(`/api/expense/${expense._id}`, JSON.stringify(expense), HEADER)
          // Dispatch action to reducer in subscribe block here
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_EXPENSE', payload: expense }));
    }

    deleteExpense(expense: Expense) {

        this.http.delete(`/api/expense/${expense._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_EXPENSE', payload: expense }));
    }
}
