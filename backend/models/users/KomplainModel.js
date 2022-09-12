import mongoose from "mongoose";
import moment from "moment";

const now = moment();

const Komplain = mongoose.Schema(
  {
    nama_penyewa: {
      type: String,
    },
    no_kontrakan: {
      type: String,
    },
    nama_kendala: {
      type: String,
      // required : true,
    },
    nama_kendala_lain: {
      type: String,
      // required : true,
    },
    bukti_foto1: {
      type: String,
      // required : true,
    },
    bukti_foto2: {
      type: String,
      // required : true,
    },
    bukti_foto3: {
      type: String,
      // required : true,
    },
    bukti_vidio: {
      type: String,
      // required : true,
    },
    deskripsi: {
      type: String,
      // required : true,
    },
    status_pengerjaan: {
      type: String,
      // required : true,
    },
    // bukti video dari admin
    bukti_video_admin: {
      type: String,
    },
    cara_penanganan: {
      type: String,
    },
    biaya_penanganan: {
      type: Number,
    },
    estimasi: {
      type: String,
    },
    user_id: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    // createdAt: {
    //   type: String,
    //   default: () => moment().format("YYYY-MM-DD"),
    // },
  },
  { timestamps: true }
);

export default mongoose.model("komplains", Komplain);
