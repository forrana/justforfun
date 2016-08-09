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

import {FeedbackService} from './feedback.service';
import {UsersService} from '../user/users.service';
import {Feedback} from './feedback.store';
import {AppStore} from '../app.store';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'feedback-detail',
  template: require('./feedback-details.html'),
})
export class FeedbackDetails {
  originalTitle: string;
  currentDate: string;
  selectedFeedback: Feedback;
  userName: string;
  user: any;
  // Assign our `recipe` to a locally scoped property
  // Perform additional logic on every update via ES6 setter
  // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
  // which we will use to bind our form to
  setFeedback = (value) => {
      if (value) this.originalTitle = value.name;
      this.selectedFeedback = Object.assign({user: this.userName
                                            }, value);
      // DEBUG
      console.log('this.selectedFeedback: ');
      console.log(this.selectedFeedback);
  }

  @Input('feedback') set _feedback(value: Feedback) {
      this.setFeedback(value);

      this.usersService
          .getCurrentUser()
          .subscribe(
            success => {
                this.user.userName = success.json().username;
                this.setFeedback(value);
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
      this.cancelled.emit(this.selectedFeedback);
  }

  getCureentUser() {
      this.usersService
          .getCurrentUser()
          .subscribe(
            success => this.userName = success.json().username,
            error =>  console.log(<any>error.text())
          );
  }
}
