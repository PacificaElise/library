import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: String || Number,
    required: true,
  },
  issueYear: {
    type: String || Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publish: {
    type: String,
    required: true,
  },
  pages: {
    type: String || Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  weight: {
    type: String || Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  authors: {
    type: String || Array,
    required: true,
  },
  images: {
    type: Object || Array,
    required: true,
  },
  categories: {
    type: String || Array,
    required: true,
  },
  comments: {
    type: Object || Array,
    required: true,
  },
  booking: {
    type: Object,
    required: true,
  },
  delivery: {
    type: Object,
    required: true,
  },
  histories: {
    type: Object || Array,
    required: true,
  },
});

export default mongoose.model('Book', BookSchema);
