import mongoose from "mongoose";

const MasterKendala = mongoose.Schema(
  {
    nama_kendala: {
      type: String,
      required: true,
    },
    estimasi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("masterkendalas", MasterKendala);
