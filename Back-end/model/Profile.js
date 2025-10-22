import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',           
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  stream: {
    type: String,            
    default: '',
  },
  contactNumber: {
    type: String,              
    default: '',
  },
  address: {type:String,default:''},
  about: {
    type: String,        
    maxlength: 500,
    default: '',
  },
  github: {type:String,default:''},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

profileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Profile', profileSchema);
