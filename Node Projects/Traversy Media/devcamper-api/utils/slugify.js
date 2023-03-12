const slugify = (name) => {
  return name.toLowerCase().split('.').join('').split(' ').join('-');
};

module.exports = slugify;
