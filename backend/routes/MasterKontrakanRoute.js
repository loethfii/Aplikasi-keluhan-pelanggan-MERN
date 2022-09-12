import express from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

import {
  getMasterKontrakans,
  saveMasterKontrakan,
  getMasterKontrakanById,
  updateMasterKontrakan,
  deleteMasterKontrakan,
} from "../controllers/MasterKontrakanController.js";

const router = express.Router();

//tangkap semua data
router.get("/masterkontrakan", getMasterKontrakans);
//cari berdasarkan id
router.get("/masterkontrakan/:id", getMasterKontrakanById);
//input data
router.post("/masterkontrakan", saveMasterKontrakan);
//udpate data
router.patch("/masterkontrakan/:id", updateMasterKontrakan);
//delete satu data list kontkran
router.delete("/masterkontrakan/:id", deleteMasterKontrakan);
export default router;
