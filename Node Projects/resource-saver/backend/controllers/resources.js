const Resource = require('../models/Resource');

const getAllResources = async (req, res) => {
  const { slug } = req.query;

  let result = Resource.find({ user: req.user });

  if (slug) {
    result = result.findOne({ slug });
  }

  const resources = await result.populate('notes');
  res.status(200).json({ success: true, resources });
};

const getSingleResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(400);
    throw new Error('No resource found');
  }

  res.status(200).json({ success: true, resource });
};

const createResource = async (req, res) => {
  const { name, description } = req.body;
  req.body.user = req.user;

  if (!name || !description) {
    res.status(400);
    throw new Error('Please add a resource name and a resource description');
  }

  const resource = await Resource.create(req.body);
  res.status(200).json({ success: true, resource });
};

const updateResource = async (req, res) => {
  let resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(400);
    throw new Error('No resource found');
  }

  if (resource.user.toString() !== req.user) {
    res.status(400);
    throw new Error('Not authorized');
  }

  resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await resource.save();

  res.status(200).json({ success: true, resource });
};

const deleteResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(400);
    throw new Error('No resource found');
  }

  if (resource.user.toString() !== req.user) {
    res.status(400);
    throw new Error('Not authorized');
  }

  await resource.remove();

  res
    .status(200)
    .json({ success: true, message: 'resource removed successfully' });
};

module.exports = {
  getAllResources,
  getSingleResource,
  createResource,
  updateResource,
  deleteResource,
};
