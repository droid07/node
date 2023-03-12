const members = require('../members');
const { v4: uuidv4 } = require('uuid');

const getMembers = (req, res) => {
  res.status(200).json(members);
};

const getSingleMember = (req, res) => {
  const { id } = req.params;

  const singleMember = members.find((member) => member.id === parseInt(id));

  if (!singleMember)
    return res
      .status(400)
      .json({ success: false, msg: 'no member found with this id' });

  res.status(200).json(singleMember);
};

const postMember = (req, res) => {
  const newMember = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    return res
      .status(400)
      .json({ success: false, msg: 'Name and Email not found' });
  }

  members.push(newMember);

  res.status(200).json(members);
};

const editMember = (req, res) => {
  const { id } = req.params;

  const checkMember = members.find((member) => member.id === parseInt(id));

  if (!checkMember)
    return res
      .status(400)
      .json({ success: false, msg: 'no member found with this id' });

  const newMember = members.filter((member) => {
    if (member.id === parseInt(id)) {
      member.name = req.body.name;
      member.email = req.body.email;
    }
    return member;
  });

  res.status(200).json(newMember);
};

const deleteMember = (req, res) => {
  const { id } = req.params;

  const checkMember = members.find((member) => member.id !== parseInt(id));

  if (!checkMember)
    return res
      .status(400)
      .json({ success: false, msg: 'no member found with this id' });

  const deleteMember = members.filter((member) => member.id !== parseInt(id));

  res.status(200).json({ success: 'true', deleteMember });
};

module.exports = {
  getMembers,
  getSingleMember,
  postMember,
  editMember,
  deleteMember,
};
