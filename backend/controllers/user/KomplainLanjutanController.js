import KomplainLanjutan from "../../models/users/KomplainLanjutanModel.js";

//tampilkan semua komplain lanjutan
export const getKomplainLanjutans = async (req, res) => {
  try {
    const KomplainLanjutans = await KomplainLanjutan.find({}).sort({
      _id: "descending",
    });
    for (const i in KomplainLanjutans) {
      const komplainlanjutan = KomplainLanjutans[i];
      komplainlanjutan[
        "bukti_foto1"
      ] = `http://localhost:5000/${komplainlanjutan.bukti_foto1}`;
      komplainlanjutan[
        "bukti_foto2"
      ] = `http://localhost:5000/${komplainlanjutan.bukti_foto2}`;
      komplainlanjutan[
        "bukti_foto3"
      ] = `http://localhost:5000/${komplainlanjutan.bukti_foto3}`;
      komplainlanjutan[
        "bukti_vidio"
      ] = `http://localhost:5000/${komplainlanjutan.bukti_vidio}`;
    }
    res.json(KomplainLanjutans);
  } catch (error) {
    console.status(500).json({ message: error.message });
  }
};

//tampilkan dengan id

//buat pengajuan lanjutan

export const buatKomplainLanjutan = async (req, res) => {
  try {
    console.log(req.files);
    const data = {
      bukti_foto1: req.files.bukti_foto1[0].originalname,
      bukti_foto2: req.files.bukti_foto2[0].originalname,
      bukti_foto3: req.files.bukti_foto3[0].originalname,
      bukti_vidio: req.files.bukti_vidio[0].originalname,
      deskripsi: req.body.deskripsi,
      komplain_id: req.body.komplain_id,
      nama_kendala: req.body.nama_kendala,
      nama_kendala_lain: req.body.nama_kendala_lain,
    };
    const komplainLanjutan = new KomplainLanjutan(data);
    const insertedpengajuankomplainlanjutan = await komplainLanjutan.save();
    res.status(201).json(insertedpengajuankomplainlanjutan);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};
