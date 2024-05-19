import mongoose from 'mongoose';

const { Schema , model } = mongoose;

const QuizSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  questions: [{
    question: String,
    options: [String],
    answer: Number
  }]
});

export default model('Quiz', QuizSchema);
