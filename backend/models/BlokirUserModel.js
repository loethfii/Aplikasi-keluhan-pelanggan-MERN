import mongoose from "mongoose";

const BlokirUser = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.model("blokierusers", BlokirUser);
