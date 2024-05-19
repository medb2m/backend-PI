import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CertificateSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default model('Certificate', CertificateSchema);
