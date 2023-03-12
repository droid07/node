const Note = require('../models/Note');
const Resource = require('../models/Resource');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const getAllNotes = async (req, res) => {
  const resource = await Resource.findOne({ slug: req.params.slug });
  const notes = await Note.find({ resource: resource._id });
  res.status(200).json({ success: true, notes });
};

const getSingleNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('No note found');
  }

  res.status(200).json({ success: true, note });
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  req.body.resource = req.params.id;
  req.body.user = req.user;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add the note title and the note content');
  }

  const note = await Note.create(req.body);
  res.status(200).json({ success: true, note });
};

const updateNote = async (req, res) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('No note found');
  }

  if (note.user.toString() !== req.user) {
    res.status(400);
    throw new Error('Not authorized');
  }

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await note.save();

  res.status(200).json({ success: true, note });
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('No note found');
  }

  if (note.user.toString() !== req.user) {
    res.status(400);
    throw new Error('Not authorized');
  }

  await note.remove();

  res.status(200).json({ success: true, message: 'note removed successfully' });
};

const uploadImg = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: result.secure_url });
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  uploadImg,
};

// `${baseURL}/notes/upload`