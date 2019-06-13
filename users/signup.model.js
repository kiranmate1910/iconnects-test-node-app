const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
});

export default mongoose.model('Signup', SignupSchema);
