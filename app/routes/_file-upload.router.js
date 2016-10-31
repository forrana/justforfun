import multer from 'multer';
import fs from 'fs';

const DIR = './uploads/';
const PATH = './dist/src/assets/uploads/';

export default (app, router, auth) => {

    let upload = multer({dest: PATH}).single('file');

    router.route('/files')

    .get((req, res) => {
        fs.readdir(PATH, function(err, items) {
            for (var i=0; i<items.length; i++) {
                console.log(items[i]);
            }
            res.json(items);
        });
    })

    .post((req, res) => {
      upload(req, res, (err) => {
        if (err) {
          return res.end(err.toString());
        }
            res.json(req.file);
        });
    });
};
