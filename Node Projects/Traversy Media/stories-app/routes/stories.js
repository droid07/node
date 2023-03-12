const express = require('express');
const router = express.Router();
const { getAllStories } = require('../controllers/stories');

router.route('/').get(getAllStories);

module.exports = router;
