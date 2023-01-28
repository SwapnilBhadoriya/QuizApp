const express = require('express');

const router = express.Router();
const {createQuizHandler} = require('../controllers/admin')

router.route('/create').post(createQuizHandler);


module.exports = router;