const express = require('express');
const {
  getAllResources,
  createResource,
  getSingleResource,
  updateResource,
  deleteResource,
} = require('../controllers/resources');
const protect = require('../middlewares/auth');
const router = express.Router();

router.use(protect);

router.route('/').get(getAllResources).post(createResource);
router
  .route('/:id')
  .get(getSingleResource)
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;
