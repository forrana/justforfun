// ```
// recipe.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// recipe.model.js may be freely distributed under the MIT license
// ```

// */app/models/fire-eqip.model.js*

// # Eqip Model

// Note: MongoDB will autogenerate an _id for each eqip object created

// Grab the Mongoose module
import mongoose from 'mongoose';
import User from './user.model.js';


// Create a `schema` for the `Expense` object
let fireEqipSchema = new mongoose.Schema({
  name: { type : String },
  description: { type : String },
  picture: {type : String },
  tags: { type: Array },
  user: { type: mongoose.Schema.ObjectId,
            ref: 'User' }
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('FireEqip', fireEqipSchema);
