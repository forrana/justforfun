import {Users} from './Users.reducer';

import {selectedUser} from './selected-Users.reducer';

import {
  it,
  describe,
  expect
} from '@angular/core/testing';

describe('Users', () => {
  describe('`selectedUser` store', () => {
    it('returns null by default', () => {
      let defaultState = selectedRecipe(undefined, {type: 'random', payload: {}});

      expect(defaultState).toBeNull();
    });

    it('`SELECT_User` returns the provided payload', () => {
      let selectUser = selectedUser(undefined, {type: 'SELECT_User', payload: 'payload'});

      expect(selectUser).toBe('payload');
    });
  });

  describe('`User` store', () => {
    let initialState = [
      { _id: 0, name: 'First User' },
      { _id: 1, name: 'Second User' }
    ];

    it('returns an empty array by default', () => {
      let defaultState = Users(undefined, {type: 'random', payload: {}});

      expect(defaultState).toEqual([]);
    });

    it('`ADD_UserS`', () => {
      let payload = initialState,
          stateItems = Users([], {type: 'ADD_UserS', payload: payload});

      expect(stateItems).toEqual(payload);
    });

    it('`CREATE_User`', () => {
      let payload = {_id: 2, name: 'added User'},
          result = [...initialState, payload],
          stateItems = Users(initialState, {type: 'CREATE_User', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`UPDATE_User`', () => {
      let payload = { _id: 1, name: 'Updated User' },
          result = [ initialState[0], { _id: 1, name: 'Updated User' } ],
          stateItems = Users(initialState, {type: 'UPDATE_User', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`DELETE_User`', () => {
      let payload = { _id: 0 },
          result = [ initialState[1] ],
          stateItems = Users(initialState, {type: 'DELETE_User', payload: payload});

      // DEBUG
      console.log('result: ');
      console.log(result);

      expect(stateItems).toEqual(result);
    });
  });
});
