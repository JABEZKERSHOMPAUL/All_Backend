const Image = require('./../model/image.modal');
const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); /// 1234567897654--screenshot08.png // /uploads/image/
  },
});

const upload = multer({
  storage: fileStorage,
}).single('image');

const uploadImage = async (req, res) => {
  // console.log(req.files);
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      let image;
      console.log(req.file);
      if (req.file) {
        image = req.file.path.replace(/\\/g, '/');
      }

      const newImage = new Image({
        image,
      });

      newImage
        .save()
        .then(() => {
          res.json({ message: 'Uploaded & saved' });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

module.exports = { uploadImage };
