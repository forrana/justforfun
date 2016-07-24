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
import FireEqip from '../models/fire-eqip.model';

export default (app, router, auth) => {

  // ## Expense API Routes

  // Define routes for the `expense` API

  router.route('/eqip')

    // ### Create a `expense`

    // Accessed at POST http://localhost:8080/api/expense

    // Create a `expense`
    .post(auth, (req, res) => {
          FireEqip.create( {

            name : req.body.name,

            description : req.body.description,

            picture : req.body.picture,

            tags : req.body.tags,

            user: req.body.user,

        }, (err, eqip) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Fire eqip created: ${eqip}`);

            // return the new `expense` to our front-end
            res.json(eqip);
          });
    })

    // ### Get all of the `expenses`

    // Accessed at GET http://localhost:8080/api/expense
    .get((req, res) => {
        console.log('user:', req.user);
      //auth(req, res);
      FireEqip.find((err, eqips) => {
        if(err)
          res.send(err);
        else
          res.json(eqips);
      });
      // Use mongoose to get all expenses in the database
    });

  router.route('/eqip/:eqip_id')

    // ### Get a `expense` by ID

    // Accessed at GET http://localhost:8080/api/expense/:expense_id
    .get(auth, (req, res) => {
          // Use mongoose to fetch a single `expense` by id in the database
          FireEqip.findOne(req.params.eqip_id, (err, eqip) => {

            if(err)
              res.send(err);
            else
              res.json(eqip);
          });
    })

    // ### Update a `expense` by ID

    // Accessed at PUT http://localhost:8080/api/expense/:expense_id
    .put(auth, (req, res) => {

      // use our `expense` model to find the `expense` we want
      FireEqip.findOne({

        '_id' : req.params.eqip._id

    }, (err, eqip) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          eqip.name = req.body.name;

        if (req.body.cost)
          eqip.picture = req.body.picture;

        if (req.body.tags)
          eqip.tags = req.body.tags;

        if (req.body.user)
          eqip.user = req.body.user;

        if (req.body.description)
          eqip.description = req.body.description;

        // save the `expense`
        return eqip.save((err) => {

          if (err)
            res.send(err);

          return res.send(eqip);

        });
      });
    })

    // ### Delete a `expense` by ID

    // Accessed at DELETE http://localhost:8080/api/expense/:expense_id
    .delete(auth, (req, res) => {

      // DEBUG
      console.log(`Attempting to delete expense with id: ${req.params.eqip_id}`);

      FireEqip.remove({

        _id : req.params.eqip_id
    }, (err, eqip) => {

        if(err)
          res.send(err);

        else
          console.log('Expense successfully deleted!');

        FireEqip.find((err, eqips) => {
          if(err)
            res.send(err);

          res.json(eqips);
        });
      });
    });
};
