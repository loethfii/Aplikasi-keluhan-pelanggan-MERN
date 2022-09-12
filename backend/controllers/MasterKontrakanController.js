import MasterKontrakan from "../models/MaterKontrakanModel.js";

//tapilin semua data kontrakan
export const getMasterKontrakans = async (req, res) => {
  try {
    const masterkontrakans = await MasterKontrakan.find({}).sort({
      _id: "descending",
    });
    res.json(masterkontrakans);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

//cari dengan id
export const getMasterKontrakanById = async (req, res) => {
  try {
    const masterkontrakan = await MasterKontrakan.findById(req.params.id);
    res.json(masterkontrakan);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//input data kontrakan
export const saveMasterKontrakan = async (req, res) => {
  const masterkontrakan = new MasterKontrakan(req.body);

  try {
    const insertedmasterkontrakan = await masterkontrakan.save();
    res.status(201).json(insertedmasterkontrakan);
  } catch {
    res.status(400).json({ message: error.message });
  }
};
//update master kontrakan
export const updateMasterKontrakan = async (req, res) => {
  try {
    const updatedmasterkontrakan = await MasterKontrakan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedmasterkontrakan);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

//delete data kontrkan by id

export const deleteMasterKontrakan = async (req, res) => {
  try {
    const deletedmasterkontrakan = await MasterKontrakan.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(deletedmasterkontrakan);
  } catch (error) {
    res.status(400).json({ message: message.error });
  }
};
