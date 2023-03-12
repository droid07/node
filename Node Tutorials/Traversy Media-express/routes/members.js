const express = require('express');
const {
  getMembers,
  getSingleMember,
  postMember,
  deleteMember,
  editMember,
} = require('../controllers');
const router = express.Router();

router.get('/', getMembers);
router.get('/:id', getSingleMember);
router.post('/', postMember);
router.put('/:id', editMember);
router.delete('/:id', deleteMember);

module.exports = router;
