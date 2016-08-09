// ```
// recipe.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// recipe.model.js may be freely distributed under the MIT license
// ```

// */app/models/project.model.js*

// # Project Model

// Note: MongoDB will autogenerate an _id for each project object created

// Grab the Mongoose module
import mongoose from 'mongoose';
import User from './user.model.js';


// Create a `schema` for the `Project` object
let projectSchema = new mongoose.Schema({
  name: { type : String },
  description: { type : String },
  pictures: {type : Array },
  tags: { type: Array },
  user: { type: mongoose.Schema.ObjectId,
            ref: 'User' }
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Project', projectSchema);
