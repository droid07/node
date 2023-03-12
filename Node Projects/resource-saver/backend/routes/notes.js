const express = require('express');
const {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  uploadImg,
} = require('../controllers/notes');
const protect = require('../middlewares/auth');
const router = express.Router();

router.use(protect);

router.route('/upload').post(uploadImg);
router.route('/all/:slug').get(getAllNotes);
router.route('/add/:id').post(createNote);
router.route('/:id').get(getSingleNote).put(updateNote).delete(deleteNote);

module.exports = router;
