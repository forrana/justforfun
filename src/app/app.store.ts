// Import our `Recipe` store
import {Recipe} from './recipes/recipe.store';

import {User} from './user/users.store';
// Import our `Expenses` store
import {Expense} from './expenses/expenses.store';

import {Project} from './projects/project.store';

import {Feedback} from './feedbacks/feedback.store';

import {FireEqip} from './fire-eqip/fire-eqip.store';

// We are dealing with a single object that has:
//   * An `recipes` collection
//   * A `selectedRecipe` property holding a single `Recipe`
export interface AppStore {

    expenses: Expense[];
    selectedExpense: Expense;

    projects: Project[];
    selectedProject: Project;

    feedbacks: Feedback[];
    selectedFeedback: Feedback;

    eqips: FireEqip[];
    selectedFireEqip: FireEqip;
    // If ever you were to desire more functionality, you
    // could expand the `store` with new `key, value` pairs
    // to accomodate the updated model
    //
    // . . .
    //
};
