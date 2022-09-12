import express from "express";

import {
  getKomplains,
  getKomplainUsers,
  getKomplainById,
  ajukanKomplain,
  prosesPengajuanKomplain,
  getKomplainUserById,
  StatusBelum_Diproses,
  StatusSedangProses,
  StatusMenungguKonfirmasi,
  StatusKeluhanSelesai,
  StatusKeluhanBelumSelesai,
  UsersStatusBelumDiproses,
  UsersStatusSedangDalamProses,
  UsersStatusMenungguKonfirmasi,
  UsersStatusKeluhanSelesai,
  UsersStatusBelumSelesai,
  buktiVideoAdmin,
} from "../../controllers/user/KomplainController.js";
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

router.get("/komplain", getKomplains);
// status pengerjaan
router.get("/belumdiproses", StatusBelum_Diproses);
router.get("/statussedangproses", StatusSedangProses);
router.get("/statusmenunggukonfirmasi", StatusMenungguKonfirmasi);
router.get("/statuskeluhanselesai", StatusKeluhanSelesai);
router.get("/statuskeluhanbelumselesai", StatusKeluhanBelumSelesai);
//end status pengerjaan
//status pengerjaan untuk users
router.get("/usersstatusbelumdiproses", UsersStatusBelumDiproses);
router.get("/usersstatussedangdalamproses", UsersStatusSedangDalamProses);
router.get("/usersstatusmenunggukonfirmasi", UsersStatusMenungguKonfirmasi);
router.get("/usersstatuskeluhanselesai", UsersStatusKeluhanSelesai);
router.get("/usersstatusbelumselesai", UsersStatusBelumSelesai);
//end status pengerjaan untuk users
router.get("/komplainuser", getKomplainUsers);
router.get("/komplain/:id", getKomplainById);
router.get("/komplainuser/:id", getKomplainUserById);
router.post(
  "/komplain",
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
    // {
    //   name: "bukti_video_admin",
    // },
  ]),
  ajukanKomplain
);
// bukti video admin
router.post(
  "/buktivideoadmin/:komplainID",
  upload.fields([{ name: "bukti_video_admin" }]),
  buktiVideoAdmin
);
//  prose pengajuan komplain
router.patch("/komplain/:id", prosesPengajuanKomplain);

export default router;
