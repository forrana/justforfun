import {expenses} from './expenses.reducer';

import {selectedExpense} from './selected-expenses.reducer';

import {
  it,
  describe,
  expect
} from '@angular/core/testing';

describe('Expenses', () => {
  describe('`selectedExpense` store', () => {
    it('returns null by default', () => {
      let defaultState = selectedRecipe(undefined, {type: 'random', payload: {}});

      expect(defaultState).toBeNull();
    });

    it('`SELECT_EXPENSE` returns the provided payload', () => {
      let selectExpense = selectedExpense(undefined, {type: 'SELECT_EXPENSE', payload: 'payload'});

      expect(selectExpense).toBe('payload');
    });
  });

  describe('`expense` store', () => {
    let initialState = [
      { _id: 0, name: 'First Expense' },
      { _id: 1, name: 'Second Expense' }
    ];

    it('returns an empty array by default', () => {
      let defaultState = expenses(undefined, {type: 'random', payload: {}});

      expect(defaultState).toEqual([]);
    });

    it('`ADD_EXPENSES`', () => {
      let payload = initialState,
          stateItems = expenses([], {type: 'ADD_EXPENSES', payload: payload});

      expect(stateItems).toEqual(payload);
    });

    it('`CREATE_EXPENSE`', () => {
      let payload = {_id: 2, name: 'added expense'},
          result = [...initialState, payload],
          stateItems = expenses(initialState, {type: 'CREATE_EXPENSE', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`UPDATE_EXPENSE`', () => {
      let payload = { _id: 1, name: 'Updated EXPENSE' },
          result = [ initialState[0], { _id: 1, name: 'Updated EXPENSE' } ],
          stateItems = expenses(initialState, {type: 'UPDATE_EXPENSE', payload: payload});

      expect(stateItems).toEqual(result);
    });

    it('`DELETE_EXPENSE`', () => {
      let payload = { _id: 0 },
          result = [ initialState[1] ],
          stateItems = expenses(initialState, {type: 'DELETE_EXPENSE', payload: payload});

      // DEBUG
      console.log('result: ');
      console.log(result);

      expect(stateItems).toEqual(result);
    });
  });
});
