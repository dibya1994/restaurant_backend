var multer = require('multer');

const files={
    storage:function(){
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/category-image/')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
        return storage;
    },

    allowedFile:function(req, file, cb) {
        
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only  files are allowed!';
            return cb(new Error('Only  files are allowed!'), false);
        }
        cb(null, true);
    }


}
const brand={
    storage:function(){
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/uploads/brand-image/')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
        return storage;
    },

    allowedFile:function(req, file, cb) {
        
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only  files are allowed!';
            return cb(new Error('Only  files are allowed!'), false);
        }
        cb(null, true);
    }
}

module.exports = {
    files,brand
}