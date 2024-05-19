import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
    name: String,
    message : String,
    userID: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });
  
  export default model('Chat', ChatSchema);