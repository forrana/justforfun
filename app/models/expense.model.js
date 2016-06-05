// ```
// recipe.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// recipe.model.js may be freely distributed under the MIT license
// ```

// */app/models/expense.model.js*

// # Expense Model

// Note: MongoDB will autogenerate an _id for each Recipe object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Expense` object
let expenseSchema = new mongoose.Schema({
  name: { type : String },
  tags: { type: Array },
  cost: { type: Number},
  currency: { type: String},
  user: { type: String},
  description: { type : String },
  date: { type : Date },
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Expense', expenseSchema);
