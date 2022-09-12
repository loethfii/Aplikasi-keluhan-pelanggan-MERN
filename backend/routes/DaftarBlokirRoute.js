import express from "express";

import {
  GetDaftarBlokir,
  DeleteDaftarBlokir,
} from "../controllers/BlokirUserController.js";

const router = express.Router();

router.get("/daftarblokir", GetDaftarBlokir);
router.delete("/daftarblokir/:id", DeleteDaftarBlokir);

export default router;
