// ```
// selected-recipe.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// selected-feedback.reducer.js may be freely distributed under the MIT license
// ```

// # Redux interface/reducer for `feedbacks`

// The `selected feedback` reducer handles the currently
// selected recipe
export const selectedFeedback = (state: any = null, {type, payload}) => {

  // DEBUG
  console.log('selected Feedback reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

    // When an `event` from our store is dispatched with an action
    // type of `SELECT_RECIPE`, it will hit this switch case
    case 'SELECT_FEEDBACK':
      return payload;

    default:
      return state;
  }
};
