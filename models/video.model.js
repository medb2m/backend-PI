import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VideoSchema = new Schema({
  title: { type: String},
  url: { type: String },
  length: { type: Number},
});

export default model('Video', VideoSchema);