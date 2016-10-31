// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// expense.component.js may be freely distributed under the MIT license
// ```

// # Expense Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {FireEqipService} from './fire-eqip.service';
import {UsersService} from '../user/users.service';
import {FireEqip} from './fire-eqip.store';
import {AppStore} from '../app.store';
import {DatePipe} from "@angular/common";

import {FileUploaderComponent} from '../shared/components/file-uploader/file-uploader';

@Component({
  selector: 'fire-eqip-detail',
  template: require('./fire-eqip-details.html'),
  directives: [FileUploaderComponent],
})
export class FireEqipDetails {
  originalTitle: string;
  currentDate: string;
  selectedFireEqip: FireEqip;
  userName: string;
  user: any;
  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  setFireEqip = (value) => {
      if (value) this.originalTitle = value.name;
      this.selectedFireEqip = Object.assign({user: this.userName
                                            }, value);
      // DEBUG
      console.log('this.selectedFireEqip: ');
      console.log(this.selectedFireEqip);
  }

  @Input('eqip') set _eqip(value: FireEqip) {
      this.setFireEqip(value);

      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                this.user.userName = success.json().username;
                this.setFireEqip(value);
            },
            error =>  {
                console.log(<any>error.text());
            }
          );
  }

  // Allow the user to save/delete a `recipe or cancel the
  // operation. Flow events up from here.
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor(private usersService: UsersService) {
      this.user = {};
      this.currentDate = new Date().toISOString().slice(0, 10);
  }
  onInit(){
      this.cancelled.emit(this.selectedFireEqip);
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => this.userName = success.json().username,
            error =>  console.log(<any>error.text())
          );
  }

  // Whenever the user needs to add a new `tag`, push an
  // empty `tag` object to the `tags` array on the
  // `selectedRecipe`
  newTag() {

    // blank `tag` object
    let tag = {
      name: ''
    };

    // Check to see if the `tags` array exists before
    // attempting to push a `tag` to it
    if (!this.selectedFireEqip.tags)
      this.selectedFireEqip.tags = [];

    this.selectedFireEqip.tags.push(tag);
  }

  deleteTag(tag) {
    // loop through all of the `tags` in the `selectedRecipe`
    for (let i = 0; i < this.selectedFireEqip.tags.length; i++) {
      // if the `tag` at the current index matches that of the one
      // the user is trying to delete
      if (this.selectedFireEqip.tags[i] === tag) {
        // delete the `tag` at the current index
        this.selectedFireEqip.tags.splice(i, 1);
      }
    }
  }
}
