import express from "express";

import { 
    getMasterKendalas,
    saveMasterKendala,
    getMasterKendalaById,
    updateMasterKendala,
    deleteMasterKendala,
 } from "../controllers/MasterKendalaController.js"

const router = express.Router()

router.get('/masterkendala', getMasterKendalas)
router.get('/masterkendala/:id', getMasterKendalaById)
router.post('/masterkendala', saveMasterKendala)
router.patch('/masterkendala/:id', updateMasterKendala)
router.delete('/masterkendala/:id', deleteMasterKendala)


export default router