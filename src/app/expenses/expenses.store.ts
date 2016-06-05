// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `recipes`

export interface Expense {
  _id: number;
  tags: Array<Object>;
  name: string;
  description: string;
  cost: number;
  currency: string;
  user: string;
  date: string;
};
