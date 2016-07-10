// ```
// expenses.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```

// # Expenses Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../app.store';

import {Expense} from './expenses.store';
import {ExpensesService} from './expenses.service';
import {UsersService} from '../user/users.service';
import {ExpensesDetails} from './expenses-details.component';
import {ExpensesList} from './expenses-list.component';

@Component({
  selector: 'expenses',
  providers: [],
  template: require('./expenses.html'),
  directives: [ExpensesList, ExpensesDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Expenses {
  userName: string;
  userId: string;
  expenses: Observable<Array<Expense>>;
  statusMessage: String;

  selectedExpense: Observable<Expense>;

  constructor(private expensesService: ExpensesService,
              private store: Store<AppStore>,
              private usersService: UsersService
            ) {

    // Bind to the `recipes` observable on `RecipeService`
    this.expenses = expensesService.expenses;

    // Bind the `selectedRecipe` observable from the store
    this.selectedExpense = store.select('selectedExpense');

    // DEBUG
    this.selectedExpense.subscribe(v => console.log(v));

    this.getCureentUser();

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    expensesService.loadExpenses();
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                        this.userName = success.json().username;
                        this.userId = success.json()._id;
                    },
            error =>  console.log(<any>error.text())
          );
  }

  selectExpense(expense: Expense) {

    this.store.dispatch({
      type: 'SELECT_EXPENSE',
      payload: expense
    });
  }

  deleteExpense(expense: Expense) {

    this.expensesService.deleteExpense(expense);
  }

  resetExpense() {
    let emptyExpense: Expense = {
        _id: null,
        tags: [],
        name: null,
        description: '',
        cost: null,
        currency: null,
        user: this.userId,
        date: null
    };

    this.store.dispatch({
      type: 'SELECT_EXPENSE',
      payload: emptyExpense
    });
  }

  saveExpense(expense: Expense) {
    expense.user = this.userId;
    this.expensesService.saveExpense(expense);
    this.resetExpense();
  }

  checkIsUserLogged() {

  }
}
