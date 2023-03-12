const mongoose = require('mongoose');
const slugify = require('slugify');

const ResourceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a resource name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a resource description'],
      maxlength: [100, 'Description can not be more than 100 characters'],
    },
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ResourceSchema.pre('save', function () {
  this.slug = slugify(this.name, {
    lower: true,
  });
});

ResourceSchema.pre('remove', async function () {
  await this.model('Note').deleteMany({ resource: this._id });
});

// Reverse populate with virtuals
ResourceSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'resource',
  justOne: false,
});

module.exports = mongoose.model('Resource', ResourceSchema);
