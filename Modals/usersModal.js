import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Receptionist', 'Department Staff'] },
  password: { type: String, required: true },
});

// User Model
export const UserModal = mongoose.models.Users || mongoose.model('Users', userSchema);

