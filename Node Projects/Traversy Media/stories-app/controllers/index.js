const Story = require('../models/Story');

const login = (req, res) => {
  res.render('login', {
    layout: 'login',
  });
};

const dashboard = async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.displayName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
};

module.exports = { login, dashboard };
