import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  length: { type: Number, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' , required : true }
});

export default model('Video', VideoSchema);