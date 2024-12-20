import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
});

const User = mongoose.model("newuser", registerSchema);

export default User