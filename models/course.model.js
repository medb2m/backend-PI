import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number},
  creator: { type: Schema.Types.ObjectId, ref: 'User'},
  category: { type: Schema.Types.ObjectId, ref: 'Category'},
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  enrolls: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},{timestamps : true}
);

export default model('Course', CourseSchema);
