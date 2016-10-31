// ```
// _expense.router.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _expense.router.js may be freely distributed under the MIT license
// ```

// */app/routes/_expense.router.js*

// # Recipe API object

// HTTP Verb  Route                   Description

// GET        /api/expense             Get all of the expenses
// GET        /api/expense/:expense_id  Get a single expense by expense id
// POST       /api/expense             Create a single expense
// DELETE     /api/expense/:expense_id  Delete a single expense
// PUT        /api/expense/:expense_id  Update a expense with new info

// Load the `expense` model
import Feedback from '../models/feedback.model';

export default (app, router, auth) => {

  // ## Expense API Routes

  // Define routes for the `expense` API

  router.route('/feedback')

    // ### Create a `expense`

    // Accessed at POST http://localhost:8080/api/feedback

    // Create a `expense`
    .post((req, res) => {
          Feedback.create( {

            name : req.body.name,

            description : req.body.description,

            picture : req.body.picture,

            tags : req.body.tags,

            user: req.body.user,

        }, (err, feedback) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Feedback created: ${feedback}`);

            // return the new `expense` to our front-end
            res.json(feedback);
          });
    })

    // ### Get all of the `expenses`

    // Accessed at GET http://localhost:8080/api/feedback
    .get((req, res) => {
        console.log('user:', req.user);
      //auth(req, res);
      Feedback.find((err, feedbacks) => {
        if(err)
          res.send(err);
        else
          res.json(feedbacks);
      });
      // Use mongoose to get all expenses in the database
    });

  router.route('/feedback/:feedback_id')

    // ### Get a `expense` by ID

    // Accessed at GET http://localhost:8080/api/feedback/:feedback
    .get(auth, (req, res) => {
          // Use mongoose to fetch a single `expense` by id in the database
          Feedback.findOne(req.params.feedback_id, (err, feedback) => {

            if(err)
              res.send(err);
            else
              res.json(feedback);
          });
    })

    // ### Update a `expense` by ID

    // Accessed at PUT http://localhost:8080/api/expense/:expense_id
    .put(auth, (req, res) => {

      // use our `expense` model to find the `expense` we want
      Feedback.findOne({

        '_id' : req.params.feedback._id

    }, (err, feedback) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          feedback.name = req.body.name;

        if (req.body.picture)
          feedback.picture = req.body.picture;

        if (req.body.tags)
          feedback.tags = req.body.tags;

        if (req.body.user)
          feedback.user = req.body.user;

        if (req.body.description)
          feedback.description = req.body.description;

        // save the `expense`
        return feedback.save((err) => {

          if (err)
            res.send(err);

          return res.send(feedback);

        });
      });
    })

    // ### Delete a `expense` by ID

    // Accessed at DELETE http://localhost:8080/api/expense/:expense_id
    .delete(auth, (req, res) => {

      // DEBUG
      console.log(`Attempting to delete expense with id: ${req.params.feedback_id}`);

      Feedback.remove({

        _id : req.params.feedback_id
    }, (err, feedback) => {

        if(err)
          res.send(err);

        else
          console.log('Expense successfully deleted!');

        Feedback.find((err, feedbacks) => {
          if(err)
            res.send(err);

          res.json(feedbacks);
        });
      });
    });
};
