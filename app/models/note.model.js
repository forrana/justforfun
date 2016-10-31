// ```
// todo.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// todo.model.js may be freely distributed under the MIT license
// ```

// */app/models/todo.model.js*

// ## Todo Model

// Note: MongoDB will autogenerate an _id for each Todo object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Todo` object
let noteSchema = new mongoose.Schema({
  title: { type : String },
  value: { type : String },
  color: { type : String }
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Note', noteSchema);
