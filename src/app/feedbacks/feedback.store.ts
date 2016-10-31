// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `Project`

export interface Feedback {
  _id: number;
  name: string;
  description: string;
  pictures: Array<Object>;
  user: string;
};
