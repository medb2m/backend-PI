import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ClaimSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  author: { type: Schema.Types.ObjectId, ref: 'User'  },
  createdAt: { type: Date, default: Date.now }
});

export default model('Claim', ClaimSchema);