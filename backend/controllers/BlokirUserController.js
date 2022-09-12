import BlokirUser from "../models/BlokirUserModel.js";

// get dafar blokir
export const GetDaftarBlokir = async (req, res) => {
  try {
    const daftarblokir = await BlokirUser.find();
    res.status(200).json(daftarblokir);
  } catch (error) {
    console.log(error);
  }
};

//hapus daftar blokir

export const DeleteDaftarBlokir = async (req, res) => {
  try {
    const deleteddaftarblokir = await BlokirUser.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json(deleteddaftarblokir);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
