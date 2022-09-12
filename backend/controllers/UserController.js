import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import BlokirUser from "../models/BlokirUserModel.js";

export const GetUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res(404).json({ message: error.message });
  }
};
//cari dengan id
export const GetUserById = async (req, res) => {
  try {
    const userbyid = await User.findById(req.params.id);
    res.json(userbyid);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//input data
export const SaveUser = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
      nama_penyewa: req.body.nama_penyewa,
      role: 2,
      no_kontrakan: req.body.no_kontrakan,
    };
    // const user = new User(req.body) && new User(data);
    let isNull = await User.findOne({
      email: req.body.email,
    });
    console.log(isNull === null);
    if (isNull === null) {
      const user = new User(data);
      const inserteduser = await user.save();
      res.status(201).json(inserteduser);
    } else {
      res
        .status(409)
        .json({ message: "Email sudah terpakai, pakai email yang lain" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update data user
export const EditUser = async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch {
    res.status(400).json({ message: error.message });
  }
};

//delete user
export const DeleteUser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    res.status(201).json(deleteduser);
  } catch (error) {
    res.status(400).json({ messege: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const CekEmail = await User.findOne({
      email: email,
    });

    if (CekEmail === null) {
      return res.status(401).send({
        message: "User tidak terdaftar",
      });
    }

    const CekPassword = await User.findOne({
      email: email,
      password: password,
    });

    let cariEmail = BlokirUser.find({ email: email });
    const c = await cariEmail.count();
    if (c > 2) {
      res.status(401).send({
        message: "Email terblokir hubungi admin 0895396173140",
      });
      return;
    }

    if (CekPassword === null) {
      let a = new BlokirUser(req.body);
      await a.save();
      return res.status(401).send({
        message: "Password yang dimasukkan salah",
      });
    }

    const user = JSON.stringify(CekPassword);
    var token = jwt.sign(JSON.parse(user), "secret", {
      expiresIn: "5h",
    });

    return res.status(200).send({
      message: "Success Login",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const UserProfile = async (req, res) => {
  try {
    return res.status(200).send({
      message: "Success Login",
      data: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
