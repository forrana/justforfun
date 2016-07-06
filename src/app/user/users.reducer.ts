// ```
// recipes.reducer.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.reducer.js may be freely distributed under the MIT license
// ```

// ** Import our `recipe` store
import {User} from './users.store';

// # Redux reducer for `Users`

// A traditional `reducer` is a function which takes a `state`
// object and an action to perform.

// `ngrx` reducers work differently:
//   * the second parameter is an object with the type of
//     action to perform and the payload for that action

// The `recipes` reducer performs actions on our list of `recipes`
// Notice that we set `state` to a default value to initialize
// smoothly
export const users = (state: any = [], {type, payload}) => {

  // DEBUG
  console.log('Users reducer hit! type: ');
  console.log(type);
  console.log('payload: ');
  console.log(payload);
  console.log('state: ');
  console.log(state);

  switch (type) {

    // `ADD_RECIPES` returns whatever collection passed in as a
    // new array
    case 'ADD_User':
      return payload;

    // `CREATE_RECIPE` returns a new array by concatenating the
    // existing recipe array with our new recipe
    case 'CREATE_User':
      return [...state, payload];

    // `UPDATE_RECIPE` returns a new array by mapping to the current
    // array, locating the recipe to update and cloning to create
    // a new object using `Object.assign`
    case 'UPDATE_User':
      return state.map(user => {

        return user._id === payload._id
          ? Object.assign({}, user, payload) : user;
      });

    // `DELETE_RECIPE` returns a new array by filtering out the
    // `recipe` that we want to delete
    case 'DELETE_User':

      return state.filter(user => {

        return user._id !== payload._id;
      });

    default:
      return state;
  }
};
