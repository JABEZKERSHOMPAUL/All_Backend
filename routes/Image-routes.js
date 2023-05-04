const express = require('express');
const { uploadImage } = require('../controller/Image');
const router = express.Router();

router.route('/upload/image').post(uploadImage);

module.exports = router;
