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

import {Feedback} from './feedback.store';
import {FeedbackService} from './feedback.service';
import {UsersService} from '../user/users.service';
import {FeedbackDetails} from './feedback-details.component';
import {FeedbackList} from './feedback-list.component';

@Component({
  selector: 'Feedbacks',
  providers: [],
  template: require('./feedback.html'),
  directives: [FeedbackList, FeedbackDetails],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Feedbacks {
  userName: string;
  userId: string;
  feedbacks: Observable<Array<Feedback>>;
  statusMessage: String;

  selectedFeedback: Observable<Feedback>;

  constructor(private feedbackService: FeedbackService,
              private store: Store<AppStore>,
              private usersService: UsersService
            ) {

    // Bind to the `recipes` observable on `RecipeService`
    this.feedbacks = feedbackService.feedbacks;

    // Bind the `selectedRecipe` observable from the store
    this.selectedFeedback = store.select('selectedFeedback');

    // DEBUG
    this.selectedFeedback.subscribe(v => console.log(v));

    this.getCureentUser();

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    feedbackService.loadFeedbacks();
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

  selectFeedback(feedback: Feedback) {

    this.store.dispatch({
      type: 'SELECT_FEEDBACK',
      payload: feedback
    });
  }

  deleteFeedback(feedback: Feedback) {

    this.feedbackService.deleteFeedback(feedback);
  }

  resetFeedback() {
    let emptyFeedback: Feedback = {
        _id: null,
        name: null,
        description: '',
        pictures: null,
        user: this.userId
    };

    this.store.dispatch({
      type: 'SELECT_FEEDBACK',
      payload: emptyFeedback
    });
  }

  saveFeedback(feedback: Feedback) {
    feedback.user = this.userId;
    this.feedbackService.saveFeedback(feedback);
    this.resetFeedback();
  }

  checkIsUserLogged() {

  }
}
