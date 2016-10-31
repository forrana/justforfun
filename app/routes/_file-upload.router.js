import multer from 'multer';
import fs from 'fs';
const DIR = './uploads/'

export default (app, router, auth) => {

    let upload = multer({dest: './src/assets/uploads/'}).single('file');

    router.route('/files')

    .get((req, res) => {
        fs.readdir('./src/assets/uploads/', function(err, items) {
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
