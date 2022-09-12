import MasterKendala from "../models/MasterKendalaModel.js";

//tampilkan detail kendala
export const getMasterKendalas = async (req, res) => {
  try {
    const masterkendalas = await MasterKendala.find({}).sort({
      _id: "descending",
    });
    res.json(masterkendalas);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//cari berdasarkan id
export const getMasterKendalaById = async (req, res) => {
  try {
    const masterkendala = await MasterKendala.findById(req.params.id);
    res.json(masterkendala);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//tambah daftar kendala
export const saveMasterKendala = async (req, res) => {
  const masterkendala = new MasterKendala(req.body);
  try {
    const insertedmasterkendala = await masterkendala.save();
    res.status(201).json(insertedmasterkendala);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Mahasiswa
export const updateMasterKendala = async (req, res) => {
  try {
    const updatedmasterkendala = await MasterKendala.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedmasterkendala);
  } catch {
    res.status(400).json({ message: error.message });
  }
};

//hapus daftar komplain
export const deleteMasterKendala = async (req, res) => {
  try {
    const deletemasterkendala = await MasterKendala.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(deletemasterkendala);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
