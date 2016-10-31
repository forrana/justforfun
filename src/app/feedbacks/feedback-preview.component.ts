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
import {FeedbackList} from './feedback-list.component';

@Component({
  selector: 'feedbacks-preview',
  providers: [],
  template: require('./feedback-preview.html'),
  directives: [FeedbackList],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FeedbacksPreview {
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

    // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
    // to our store which in turn updates the `recipes` collection
    feedbackService.loadFeedbacks();
  }

}
