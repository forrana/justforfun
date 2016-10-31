// ```
// _todo.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _todo.js may be freely distributed under the MIT license
// ```

// */app/routes/_todo.router.js*

// ## Todo API object

// HTTP Verb  Route                 Description

// GET        /api/todo             Get all of the todo items
// GET        /api/todo/:todo_id    Get a single todo item by todo item id
// POST       /api/todo             Create a single todo item
// DELETE     /api/todo/:todo_id    Delete a single todo item
// PUT        /api/todo/:todo_id    Update a todo item with new info

// Load the todo model
import Note from '../models/note.model';

export default (app, router) => {

  // ### Todo API Routes

  // Define routes for the todo item API

  router.route('/notes')

    // ### Create a todo item

    // Accessed at POST http://localhost:8080/api/todo

    // Create a todo item
    .post((req, res) => {

      Note.create({
        title : req.body.title,
        value : req.body.value,
        color : req.body.color
    }, (err, note) => {
        if (err)
          res.send(err);
        // DEBUG
        console.log(`Todo created: ${note}`);
        res.json(note);

        /*Note.find((err, notes) => {
          if(err)
            res.send(err);

          res.json(notes);
      });*/
      });
    })

    // ### Get all of the todo items

    // Accessed at GET http://localhost:8080/api/todo
    .get((req, res) => {

      // Use mongoose to get all todo items in the database
      Note.find((err, notes) => {
        notes = notes.filter(note => note);

        if(err)
          res.send(err);

        else
          res.json(notes);
      });
    });

  router.route('/notes/:note_id')

    // ### Get a todo item by ID

    // Accessed at GET http://localhost:8080/api/todo/:todo_id
    .get((req, res) => {

      // Use mongoose to a single todo item by id in the database
      Note.findOne(req.params.note_id, (err, note) => {

        if(err)
          res.send(err);

        else
          res.json(note);
      });
    })

    // ### Update a todo item by ID

    // Accessed at PUT http://localhost:8080/api/todo/:todo_id
    .put((req, res) => {

      // use our todo model to find the todo item we want
      Note.findOne({

        '_id' : req.params.note_id

        }, (err, note) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.value)
          note.value = req.body.value;
        if (req.body.color)
          note.color = req.body.color;
        if (req.body.title)
          note.title = req.body.title;

        // save the todo item
        return note.save((err) => {
          if (err)
            res.send(err);

          return res.send(note);
        });
      });
    })

    // ### Delete a todo item by ID

    // Accessed at DELETE http://localhost:8080/api/todo/:todo_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete todo with id: ${req.params.note_id}`);

      Note.remove({
        _id : req.params.note_id
        }, (err, note) => {

        if(err)
          res.send(err);

        console.log('Todo successfully deleted!');

        Note.find((err, notes) => {
          if(err)
            res.send(err);

          res.json(notes);
        });
      });
    });
};
