import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ChatSchema = new Schema({
    name: String,
    message : String
  });
  
  export default model('Chat', ChatSchema);