const multer = require('multer');
const loadCollection = require('./utils.js');
const Loki = require('lokijs');


const UPLOAD_PATH = 'uploads';
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const upload = multer({ dest: `${ UPLOAD_PATH }` });
const db = new Loki(`${ UPLOAD_PATH }/${ DB_NAME }`, { persistenceMethod: 'fs' });



module.exports = (app) => {
    app.post('/upload', upload.single('avatar'), 
    
    async (req, res, next) => {
        try{
            const col = await loadCollection(COLLECTION_NAME, db);
            const data = col.insert(req.file);

            db.saveDatabase();
            res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname});
            console.log('img save successfully! ');
        }
        catch (err) {
            res.sendStatus(400);
            console.log(err);
        }
    }

    // (req, res, next) => {
    //     const img = req.file;
    //     res.send(img);
    // }
    
    );
}