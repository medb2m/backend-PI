import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required : true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required : true },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  enrolls: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default model('Course', CourseSchema);
