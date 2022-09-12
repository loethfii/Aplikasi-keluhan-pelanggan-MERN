import express from "express";

import {
  getKomplainLanjutans,
  buatKomplainLanjutan,
} from "../../controllers/user/KomplainLanjutanController.js";

import multer from "multer";

var storage = multer.diskStorage({
  destination: "public/",
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
const router = express.Router();

router.get("/komplain-lanjutan", getKomplainLanjutans);
router.post(
  "/komplain-lanjutan",
  upload.fields([
    {
      name: "bukti_foto1",
    },
    {
      name: "bukti_foto2",
    },
    {
      name: "bukti_foto3",
    },
    {
      name: "bukti_vidio",
    },
  ]),
  buatKomplainLanjutan
);

export default router;
