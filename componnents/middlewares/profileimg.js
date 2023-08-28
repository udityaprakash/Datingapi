const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './profileimg');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.floor((Math.random() * 100) + 10) + '-' + file.originalname);
    }
});

const Filteration = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg'||
    file.mimetype === 'image/jpg'||
    file.mimetype === 'image/png')
        cb(null,true);
    else
        cb(null,false);
}

const uploadImg = multer({
    storage,
    limits:{
        fileSize: 10485760
    },
    Filteration
});

module.exports = uploadImg;