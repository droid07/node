const { people } = require('../data');

const getPeople = (req, res) => {
  return res.status(200).json({ success: true, people });
};

const postPeople = (req, res) => {
  const person = req.body.name;
  if (!person) {
    return res.status(400).json({ success: false, msg: 'fuck' });
  }
  return res.status(200).json({ success: true, person });
};

module.exports = { getPeople, postPeople };
