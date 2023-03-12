const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add the note title'],
    },
    content: {
      type: String,
      required: [true, 'Please add the note content'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

module.exports = mongoose.model('Note', NoteSchema);
