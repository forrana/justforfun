// ```
// recipes.store.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.store.js may be freely distributed under the MIT license
// ```

// # Redux store for `recipes`

export interface Project {
  _id: number;
  tags: Array<Object>;
  name: string;
  description: string;
  pictures: Array<Object>;
  user: string;
};
