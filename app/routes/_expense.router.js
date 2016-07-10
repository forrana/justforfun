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
import Expense from '../models/expense.model';

export default (app, router, auth) => {

  // ## Expense API Routes

  // Define routes for the `expense` API

  router.route('/expense')

    // ### Create a `expense`

    // Accessed at POST http://localhost:8080/api/expense

    // Create a `expense`
    .post(auth, (req, res) => {
        if (!req.isAuthenticated()){
            res.send(401);
        } else {
          Expense.create( {

            name : req.body.name,

            tags : req.body.tags,

            cost : req.body.cost,

            description : req.body.description,

            date: req.body.date,

            user: req.body.user,

          }, (err, expense) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Expense created: ${expense}`);

            // return the new `expense` to our front-end
            res.json(expense);
          });
      }
    })

    // ### Get all of the `expenses`

    // Accessed at GET http://localhost:8080/api/expense
    .get(auth, (req, res) => {
      //auth(req, res);
    if (!req.isAuthenticated()){
        res.send(401);
    } else {
      Expense.find((err, expense) => {
        if(err)
          res.send(err);
        else
          res.json(expense);
      });
    }
      // Use mongoose to get all expenses in the database
    });

  router.route('/expense/:expense_id')

    // ### Get a `expense` by ID

    // Accessed at GET http://localhost:8080/api/expense/:expense_id
    .get((req, res) => {
        if (!req.isAuthenticated()){
            res.send(401);
        } else {
          // Use mongoose to fetch a single `expense` by id in the database
          Expense.findOne(req.params.expense_id, (err, expense) => {

            if(err)
              res.send(err);

            else
              res.json(expense);
          });
        }
    })

    // ### Update a `expense` by ID

    // Accessed at PUT http://localhost:8080/api/expense/:expense_id
    .put((req, res) => {

      // use our `expense` model to find the `expense` we want
      Expense.findOne({

        '_id' : req.params.expense_id

        }, (err, expense) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          expense.name = req.body.name;

        if (req.body.cost)
            expense.cost = req.body.cost;

        if (req.body.tags)
          expense.tags = req.body.tags;

        if (req.body.user)
          expense.user = req.body.user;

        if (req.body.description)
          expense.description = req.body.description;

        if (req.body.date)
            expense.date = req.body.date;

        // save the `expense`
        return expense.save((err) => {

          if (err)
            res.send(err);

          return res.send(expense);

        });
      });
    })

    // ### Delete a `expense` by ID

    // Accessed at DELETE http://localhost:8080/api/expense/:expense_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete expense with id: ${req.params.expense_id}`);

      Expense.remove({

        _id : req.params.expense_id
        }, (err, expense) => {

        if(err)
          res.send(err);

        else
          console.log('Expense successfully deleted!');

        Expense.find((err, expenses) => {
          if(err)
            res.send(err);

          res.json(expenses);
        });
      });
    });
};
