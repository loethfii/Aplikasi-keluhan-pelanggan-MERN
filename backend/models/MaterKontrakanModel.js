import mongoose from "mongoose";
import moment from "moment";

// const now = moment();

// const Dates = () => {
//   return moment(this.createdAt).format("dddd");
// };
// MasterKontrakan.virtual("createdAt").get(function () {
//   return moment(this.createdAt).format("dddd");
// });

let MasterKontrakan = mongoose.Schema(
  {
    no_kontrakan: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: () => moment().format("LLLL"),
    },
    updatedAt: {
      type: String,
      default: () => moment().format("DD-MM-YYYY"),
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  }
);

// ,{timestamps : true}

export default mongoose.model("masterkontrakans", MasterKontrakan);
