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

import {FireEqip} from './fire-eqip.store';
import {FireEqipService} from './fire-eqip.service';
import {UsersService} from '../user/users.service';
import {FireEqipDetails} from './fire-eqip-details.component';
import {FireEqipList} from './fire-eqip-list.component';

@Component({
  selector: 'FireEqips',
  providers: [],
  template: require('./fire-eqip.html'),
  directives: [FireEqipList, FireEqipDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FireEqips {
  userName: string;
  userId: string;
  eqips: Observable<Array<FireEqip>>;
  statusMessage: String;

  selectedFireEqip: Observable<FireEqip>;

  constructor(private fireEqipService: FireEqipService,
              private store: Store<AppStore>,
              private usersService: UsersService
            ) {

    // Bind to the `recipes` observable on `RecipeService`
    this.eqips = fireEqipService.eqips;

    // Bind the `selectedRecipe` observable from the store
    this.selectedFireEqip = store.select('selectedFireEqip');

    // DEBUG
    this.selectedFireEqip.subscribe(v => console.log(v));

    this.getCureentUser();

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    fireEqipService.loadFireEqips();
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

  selectFireEqip(eqip: FireEqip) {

    this.store.dispatch({
      type: 'SELECT_FIREEQIP',
      payload: eqip
    });
  }

  deleteFireEqip(eqip: FireEqip) {

    this.fireEqipService.deleteFireEqip(eqip);
  }

  resetFireEqip() {
    let emptyFireEqip: FireEqip = {
        _id: null,
        tags: [],
        name: null,
        description: '',
        picture: null,
        user: this.userId
    };

    this.store.dispatch({
      type: 'SELECT_FIREEQIP',
      payload: emptyFireEqip
    });
  }

  saveFireEqip(eqip: FireEqip) {
    eqip.user = this.userId;
    this.fireEqipService.saveFireEqip(eqip);
    this.resetFireEqip();
  }

  checkIsUserLogged() {

  }
}
