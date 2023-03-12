const express = require('express');
const router = express.Router();
const { getPeople, postPeople } = require('../controllers/people');

router.get('/', getPeople);

router.post('/', postPeople);

module.exports = router;
