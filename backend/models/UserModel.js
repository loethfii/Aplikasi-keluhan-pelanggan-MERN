import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      //   unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nama_penyewa: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    no_kontrakan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//email, password,nama_penyewa, role,no_kontrakan

export default mongoose.model("users", User);
