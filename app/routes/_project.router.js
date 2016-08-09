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
import Project from '../models/project.model';

export default (app, router, auth) => {

  // ## Expense API Routes

  // Define routes for the `expense` API

  router.route('/project')

    // ### Create a `expense`

    // Accessed at POST http://localhost:8080/api/project

    // Create a `expense`
    .post(auth, (req, res) => {
          Project.create( {

            name : req.body.name,

            description : req.body.description,

            picture : req.body.picture,

            tags : req.body.tags,

            user: req.body.user,

        }, (err, project) => {

            if (err)
              res.send(err);

            // DEBUG
            console.log(`Project created: ${project}`);

            // return the new `expense` to our front-end
            res.json(project);
          });
    })

    // ### Get all of the `expenses`

    // Accessed at GET http://localhost:8080/api/project
    .get((req, res) => {
        console.log('user:', req.user);
      //auth(req, res);
      Project.find((err, projects) => {
        if(err)
          res.send(err);
        else
          res.json(projects);
      });
      // Use mongoose to get all expenses in the database
    });

  router.route('/project/:project_id')

    // ### Get a `expense` by ID

    // Accessed at GET http://localhost:8080/api/project/:project
    .get(auth, (req, res) => {
          // Use mongoose to fetch a single `expense` by id in the database
          Project.findOne(req.params.project_id, (err, project) => {

            if(err)
              res.send(err);
            else
              res.json(project);
          });
    })

    // ### Update a `expense` by ID

    // Accessed at PUT http://localhost:8080/api/expense/:expense_id
    .put(auth, (req, res) => {

      // use our `expense` model to find the `expense` we want
      Project.findOne({

        '_id' : req.params.project._id

    }, (err, project) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          project.name = req.body.name;

        if (req.body.picture)
          project.picture = req.body.picture;

        if (req.body.tags)
          project.tags = req.body.tags;

        if (req.body.user)
          project.user = req.body.user;

        if (req.body.description)
          project.description = req.body.description;

        // save the `expense`
        return project.save((err) => {

          if (err)
            res.send(err);

          return res.send(project);

        });
      });
    })

    // ### Delete a `expense` by ID

    // Accessed at DELETE http://localhost:8080/api/expense/:expense_id
    .delete(auth, (req, res) => {

      // DEBUG
      console.log(`Attempting to delete expense with id: ${req.params.project_id}`);

      Project.remove({

        _id : req.params.project_id
    }, (err, project) => {

        if(err)
          res.send(err);

        else
          console.log('Expense successfully deleted!');

        Project.find((err, projects) => {
          if(err)
            res.send(err);

          res.json(projects);
        });
      });
    });
};
