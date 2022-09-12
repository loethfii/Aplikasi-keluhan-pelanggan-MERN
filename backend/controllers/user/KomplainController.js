import Komplain from "../../models/users/KomplainModel.js";
import KomplainLanjutan from "../../models/users/KomplainLanjutanModel.js";
import moment from "moment";
import MasterKendalaModel from "../../models/MasterKendalaModel.js";
//tampilkan detail komplain
export const getKomplains = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tanggalawal && req.query.tanggalakhir) {
      filter = {
        createdAt: {
          $gte: moment(req.query.tanggalawal),
          $lte: moment(req.query.tanggalakhir),
        },
      };
    }
    let komplains = await Komplain.find(filter)
      .sort({ _id: "desc" })
      .populate("user_id");

    for (const i in komplains) {
      const komplain = komplains[i];
      komplain["bukti_foto1"] = `http://localhost:5000/${komplain.bukti_foto1}`;
      komplain["bukti_foto2"] = `http://localhost:5000/${komplain.bukti_foto2}`;
      komplain["bukti_foto3"] = `http://localhost:5000/${komplain.bukti_foto3}`;
      komplain["bukti_vidio"] = `http://localhost:5000/${komplain.bukti_vidio}`;
    }
    res.json(komplains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ROuting user biasa
export const getKomplainUsers = async (req, res) => {
  try {
    const komplains = await Komplain.find({ user_id: req.user["_id"] }).sort({
      _id: "desc",
    });
    for (const i in komplains) {
      const komplain = komplains[i];
      komplain["bukti_foto1"] = `http://localhost:5000/${komplain.bukti_foto1}`;
      komplain["bukti_foto2"] = `http://localhost:5000/${komplain.bukti_foto2}`;
      komplain["bukti_foto3"] = `http://localhost:5000/${komplain.bukti_foto3}`;
      komplain["bukti_vidio"] = `http://localhost:5000/${komplain.bukti_vidio}`;
    }
    res.json(komplains);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//users status belum di proses 1
export const UsersStatusBelumDiproses = async (req, res) => {
  try {
    const usersstatusbelumdiproses = await Komplain.find({
      user_id: req.user["_id"],
      status_pengerjaan: "1",
    });
    res.status(200).json(usersstatusbelumdiproses);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
//users status dalam proses 2
export const UsersStatusSedangDalamProses = async (req, res) => {
  try {
    const usersstatussedangdalamproses = await Komplain.find({
      user_id: req.user["_id"],
      status_pengerjaan: "2",
    });
    res.status(200).json(usersstatussedangdalamproses);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
//users status menunggu konfirmasi 3
export const UsersStatusMenungguKonfirmasi = async (req, res) => {
  try {
    const usersstatusmenunggukonfirmasi = await Komplain.find({
      user_id: req.user["_id"],
      status_pengerjaan: "3",
    });
    res.status(200).json(usersstatusmenunggukonfirmasi);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
//users status status keluhan selesai 4
export const UsersStatusKeluhanSelesai = async (req, res) => {
  try {
    const usersstatuskeluhanselesai = await Komplain.find({
      user_id: req.user["_id"],
      status_pengerjaan: "4",
    });
    res.status(200).json(usersstatuskeluhanselesai);
  } catch {
    res.status(500).json({ message: error.message });
  }
};
//users status belum selesai 5
export const UsersStatusBelumSelesai = async (req, res) => {
  try {
    const usersstatusbelumselesai = await Komplain.find({
      user_id: req.user["_id"],
      status_pengerjaan: "5",
    });
    res.status(200).json(usersstatusbelumselesai);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

// tangkap komplain by id untuk admin
export const getKomplainById = async (req, res) => {
  try {
    const komplain = await Komplain.findById(req.params.id).populate("user_id");

    komplain["bukti_foto1"] = `http://localhost:5000/${komplain.bukti_foto1}`;
    komplain["bukti_foto2"] = `http://localhost:5000/${komplain.bukti_foto2}`;
    komplain["bukti_foto3"] = `http://localhost:5000/${komplain.bukti_foto3}`;
    komplain["bukti_vidio"] = `http://localhost:5000/${komplain.bukti_vidio}`;
    komplain[
      "bukti_video_admin"
    ] = `http://localhost:5000/${komplain.bukti_video_admin}`;

    const KomplainLanjutans = await KomplainLanjutan.find({
      komplain_id: req.params.id,
    }).sort({
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

    const res1 = {
      komplain: komplain,
      komplain_lanjutan: KomplainLanjutans,
    };
    res.json(res1);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

//get komplain by id hanya user
export const getKomplainUserById = async (req, res) => {
  try {
    const komplain = await Komplain.findById(req.params.id)
      .findOne({
        user_id: req.user["_id"],
      })
      .populate("user_id");

    komplain["bukti_foto1"] = `http://localhost:5000/${komplain.bukti_foto1}`;
    komplain["bukti_foto2"] = `http://localhost:5000/${komplain.bukti_foto2}`;
    komplain["bukti_foto3"] = `http://localhost:5000/${komplain.bukti_foto3}`;
    komplain["bukti_vidio"] = `http://localhost:5000/${komplain.bukti_vidio}`;
    komplain[
      "bukti_video_admin"
    ] = `http://localhost:5000/${komplain.bukti_video_admin}`;

    const KomplainLanjutans = await KomplainLanjutan.find({
      komplain_id: req.params.id,
    }).sort({
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

    const res1 = {
      komplain: komplain,
      komplain_lanjutan: KomplainLanjutans,
    };
    res.json(res1);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// tambah pengajuan komplain
export const ajukanKomplain = async (req, res) => {
  try {
    // console.log(req.user);
    const k = await MasterKendalaModel.findById(req.body.nama_kendala);

    const data = {
      bukti_foto1: req.files.bukti_foto1[0].originalname,
      bukti_foto2: req.files.bukti_foto2[0].originalname,
      bukti_foto3: req.files.bukti_foto3[0].originalname,
      bukti_vidio: req.files.bukti_vidio[0].originalname,
      deskripsi: req.body.deskripsi,
      nama_kendala: k.nama_kendala,
      estimasi: req.body.estimasi,
      nama_kendala_lain: req.body.nama_kendala_lain,
      status_pengerjaan: 1,
      user_id: req.user["_id"],
      biaya_penanganan: 0,
    };
    const komplain = new Komplain(data);
    const insertedpengajuankomplain = await komplain.save();
    res.status(201).json(insertedpengajuankomplain);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// upload bukti video dari admin
export const buktiVideoAdmin = async (req, res) => {
  try {
    // const data = {
    //   bukti_video_admin: req.files.bukti_video_admin[0].originalname,
    // };
    // const komplain = new Komplain(data);
    const insertedvideobuktiadmin = await Komplain.updateOne(
      { _id: req.params.komplainID },
      {
        $set: {
          bukti_video_admin: req.files.bukti_video_admin[0].originalname,
        },
      }
    );
    res.status(201).json(insertedvideobuktiadmin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//Edit data status pengajuan

export const prosesPengajuanKomplain = async (req, res) => {
  try {
    const proseskomplain = await Komplain.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(proseskomplain);
  } catch (error) {
    res.status(404).json({ massage: error.message });
  }
};

// get komplain belom di proses 1
export const StatusBelum_Diproses = async (req, res) => {
  try {
    const statusbelumdiproses = await Komplain.find({ status_pengerjaan: "1" });
    res.status(200).json(statusbelumdiproses);
  } catch (error) {
    console.log(error);
  }
};

//get komplain sedang dalam proses 2
export const StatusSedangProses = async (req, res) => {
  try {
    const statussedangproses = await Komplain.find({ status_pengerjaan: "2" });
    res.status(200).json(statussedangproses);
  } catch (error) {
    console.log(error);
  }
};
//menunggu konfirmasi status 3
export const StatusMenungguKonfirmasi = async (req, res) => {
  try {
    const statusmenunggukonfirmasi = await Komplain.find({
      status_pengerjaan: "3",
    });
    res.status(200).json(statusmenunggukonfirmasi);
  } catch (error) {
    console.log(error);
  }
};
//Keluhan selesai 4
export const StatusKeluhanSelesai = async (req, res) => {
  try {
    const statuskeluhanselesai = await Komplain.find({
      status_pengerjaan: "4",
    });
    res.status(200).json(statuskeluhanselesai);
  } catch (error) {
    console.log(error);
  }
};

//keluhan belum selesai 5
export const StatusKeluhanBelumSelesai = async (req, res) => {
  try {
    const statuskeluhanbelumselesai = await Komplain.find({
      status_pengerjaan: "5",
    });
    res.status(200).json(statuskeluhanbelumselesai);
  } catch (error) {
    console.log(error);
  }
};
