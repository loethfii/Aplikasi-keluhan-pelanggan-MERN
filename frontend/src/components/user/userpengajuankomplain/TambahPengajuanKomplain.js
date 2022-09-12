import React, { useState, useEffect } from "react";
import PengajuanKomplainNavbar from "../header/PengajuanKomplainNavbar";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const TambahPengajuanKomplain = () => {
  const [nama_kendala, setNamaKendala] = useState("");
  const [bukti_foto1, Setbukti_foto1] = useState("");
  const [bukti_foto2, Setbukti_foto2] = useState("");
  const [bukti_foto3, Setbukti_foto3] = useState("");
  const [bukti_vidio, Setbukti_vidio] = useState("");
  const [deskripsi, Setdeskripsi] = useState("");

  // get kendala

  const [Kendalas, setKendala] = useState([]);
  const [estimasi, setEstimasi] = useState([]);
  //   const [status_pengerjaan, Setstatus_pengerjaan] = useState("");

  const navigate = useNavigate();
  // const { id } = useParams();

  const ajukanKendala = async (e) => {
    try {
      const form = new FormData();
      form.append("bukti_foto1", bukti_foto1);
      form.append("bukti_foto2", bukti_foto2);
      form.append("bukti_foto3", bukti_foto3);
      form.append("bukti_vidio", bukti_vidio);
      form.append("deskripsi", deskripsi);
      form.append("nama_kendala", nama_kendala);
      form.append("estimasi", estimasi);
      await axios.post(`http://localhost:5000/komplain`, form, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return navigate("/user/pengajuan-komplain");
    } catch (error) {
      console.log(error);
    }
  };

  // untuk mendapatkan list kendala

  useEffect(() => {
    getKendalas();
    // getEstimasi();
  }, []);

  const getKendalas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/masterkendala", {
        headers: {
          Authorization: token,
        },
      });
      setKendala(response.data);

      // setEstimasi(response.data);

      //  http://localhost:5000/masterkendala
    } catch (error) {
      console.log(error);
    }
  };

  // const path = Kendalas;

  const getEstimasi = async (path) => {
    try {
      setNamaKendala(path);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/masterkendala/${path}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setEstimasi(response.data.estimasi);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PengajuanKomplainNavbar />
      <div class="wrapper">
        <div class="container">
          {/* Page-Title */}
          <div class="panel">
            <div class="panel-body">
              <div class="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Kendala apa yang terjadi !</h3>
                  </div>
                  <div class="panel-body">
                    <form role="form">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Kendala apa yang terjadi?
                        </label>
                        <select
                          class="form-control"
                          onChange={(e) => getEstimasi(e.target.value)}
                        >
                          <option disabled selected>
                            Pilih kendala :
                          </option>
                          {Kendalas.map((kendala) => (
                            <option key={kendala._id} value={kendala._id}>
                              {kendala.nama_kendala}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Estimasi pengerjaan
                        </label>
                        <input
                          disabled
                          class="form-control"
                          value={estimasi}
                          onChange={(e) => setEstimasi(e.target.value)}
                        />
                      </div>

                      {/* <div class="form-group">
                        <label for="exampleInputEmail1">
                          Estimasi pengerjaan
                        </label>
                        <input
                          type="text"
                          value={nama_kendala}
                          // onChange nya ke set estimasi
                          disabled
                          className="form-control"
                        />
                      </div> */}
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
                            onChange={(e) => Setbukti_vidio(e.target.files[0])}
                            class="upload"
                            accept="video/mp4,video/x-m4v,video/*"
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
                          onClick={() => ajukanKendala()}
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

export default TambahPengajuanKomplain;
