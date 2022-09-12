import React, { useState, useEffect } from "react";
import PengajuanKomplainNavbar from "../header/PengajuanKomplainNavbar";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const TambahKomplainLanjutan = () => {
  const [nama_kendala, SetNamaKendala] = useState([]);
  const [komplain_id, SetKomplain_id] = useState([]);
  const [bukti_foto1, Setbukti_foto1] = useState("");
  const [bukti_foto2, Setbukti_foto2] = useState("");
  const [bukti_foto3, Setbukti_foto3] = useState("");
  const [bukti_vidio, Setbukti_vidio] = useState("");
  const [deskripsi, Setdeskripsi] = useState("");
  const [status_pengerjaan, Setstatus_pengerjaan] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const TambahKomplainLanjutan = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("bukti_foto1", bukti_foto1);
      form.append("bukti_foto2", bukti_foto2);
      form.append("bukti_foto3", bukti_foto3);
      form.append("bukti_vidio", bukti_vidio);
      form.append("deskripsi", deskripsi);
      form.append("komplain_id", komplain_id);
      form.append("nama_kendala", nama_kendala);
      await axios.post(`http://localhost:5000/komplain-lanjutan`, form, {
        headers: {
          Authorization: token,
        },
      });

      navigate("/user/pengajuan-komplain");
    } catch (error) {
      console.log(error);
    }
  };

  // untuk mendapatkan list kendala

  useEffect(() => {
    getPengajuanKomplain();
  }, []);

  const getPengajuanKomplain = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/komplainuser/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      SetNamaKendala(response.data.komplain.nama_kendala);
      SetKomplain_id(response.data.komplain._id);
      Setstatus_pengerjaan(response.data.komplain.status_pengerjaan);

      //  http://localhost:5000/masterkendala
    } catch (error) {
      console.log(error);
    }
  };

  const tolakKomplain = async () => {
    const status = parseInt(status_pengerjaan) + 2;
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/komplain/${id}`,
        {
          status_pengerjaan: status,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      navigate("/user/pengajuan-komplain");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PengajuanKomplainNavbar />{" "}
      <div class="wrapper">
        <div class="container">
          {/* Page-Title */}
          <div class="row">
            <div class="col-sm-12">
              <h4 class="page-title"> Pengaduan Keluhan Lanjutan</h4>
            </div>
          </div>
          <div class="panel">
            <div class="panel-body">
              <div class="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">
                      Kamu menolak status selesai, silahkan isi pengaduan
                      lanjutan
                    </h3>
                  </div>
                  <div class="panel-body">
                    <form role="form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Kendala yang terjadi
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={nama_kendala}
                          disabled="disable"
                          onChange={(e) => Setdeskripsi(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">ID Keluhan</label>
                        <input
                          type="text"
                          class="form-control"
                          value={komplain_id}
                          disabled="disable"
                          onChange={(e) => SetKomplain_id(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">
                          Upload bukti foto
                        </label>
                        <br />
                        <div class="fileupload btn btn-purple waves-effect waves-light">
                          <span>
                            <i class="ion-upload m-r-5"></i>Upload
                          </span>
                          <input
                            type="file"
                            onChange={(e) => Setbukti_foto1(e.target.files[0])}
                            class="upload"
                            accept="image/png, image/jpeg"
                          />
                        </div>{" "}
                        {bukti_foto1.name}
                      </div>
                      <div class="form-group">
                        <div class="fileupload btn btn-purple waves-effect waves-light">
                          <span>
                            <i class="ion-upload m-r-5"></i>Upload
                          </span>
                          <input
                            type="file"
                            onChange={(e) => Setbukti_foto2(e.target.files[0])}
                            class="upload"
                            accept="image/png, image/jpeg"
                          />
                        </div>{" "}
                        {bukti_foto2.name}
                      </div>
                      <div class="form-group">
                        <div class="fileupload btn btn-purple waves-effect waves-light">
                          <span>
                            <i class="ion-upload m-r-5"></i>Upload
                          </span>
                          <input
                            type="file"
                            onChange={(e) => Setbukti_foto3(e.target.files[0])}
                            class="upload"
                            accept="image/png, image/jpeg"
                          />
                        </div>{" "}
                        {bukti_foto3.name}
                      </div>

                      <div class="form-group">
                        <label for="exampleInputPassword1">
                          Upload bukti video
                        </label>
                        <br />
                        <div class="fileupload btn btn-purple waves-effect waves-light">
                          <span>
                            <i class="ion-upload m-r-5"></i>Upload
                          </span>
                          <input
                            type="file"
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={(e) => Setbukti_vidio(e.target.files[0])}
                            class="upload"
                          />
                        </div>
                        {"  "}
                        {bukti_vidio.name}
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">
                          Jelaskan secara rinci apa yang terjadi
                        </label>
                        <textarea
                          class="form-control"
                          rows="5"
                          value={deskripsi}
                          onChange={(e) => Setdeskripsi(e.target.value)}
                        ></textarea>
                      </div>
                      <div class="col-md-2">
                        <button
                          onClick={() =>
                            TambahKomplainLanjutan() && tolakKomplain()
                          }
                          type="button"
                          class="btn btn-success btn-lg btn-block waves-effect waves-light"
                        >
                          Kirim
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* panel-body */}
                </div>{" "}
                {/* panel */}
              </div>
            </div>
            {/* end: page */}
          </div>{" "}
          {/* end Panel */}
        </div>
        {/* end container */}
        {/*  */}
      </div>
      {/* end wrapper */}
    </>
  );
};

export default TambahKomplainLanjutan;
