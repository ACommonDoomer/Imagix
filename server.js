const express = require('express');
const mulder = require('multer');
const path = require('path');
const ejs = require('ejs');
const app = express();
var base_URL = "https://imagix.glitch.me/image";
var conteo;

const storage = mulder.diskStorage({
    destination: './public/image',
    filename: function (req, file, cb) {
        var random = Math.floor(Math.random() * 100) + 1;
        cb(null, 'imagix-' + Date.now() + '-'+ random +
        path.extname(file.originalname));

    }

});

const upload = mulder({
    storage: storage,
    limits: { fileSize: 800000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);

    }
  
   

}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
        
    } else {
        cb('Solo imagenes');

    };

};

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    conteo = 0;
    res.render('index');

});

app.get('/about', (req, res) =>{
    res.render('about');

});

app.get('/test', (req, res) => {
    res.render('example');

});

app.post('/upload', (req, res) => {
    conteo++;
    if (conteo == 2) {
        res.redirect('/');
        conteo = 0;

    } else {
        upload(req, res, (err) => {
            if (err) {
                res.render('index', {
                    msg: 'IMAGEN MUY GRANDE'
                });

            } else {
                res.render('modal', {
                    msg: 'Imagen Subida!',
                    file: `image/${req.file.filename}`,
                    embed: `<img src="${base_URL}/${req.file.filename}" />`,
                    url: `${base_URL}/${req.file.filename}`

                });

            };

        });

    };

});

const port = 3000;
app.listen(port, () =>
    console.log('Server corriendo en el puerto: ' + port));