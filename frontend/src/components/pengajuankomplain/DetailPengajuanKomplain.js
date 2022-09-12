import React, { useState, useEffect } from "react";
import PengajuanKomplain from "../navbar/PengajuanKomplain";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const DetailPengajuanKomplain = () => {
  const [nama_kendala, Setnama_kendala] = useState([]);
  const [bukti_foto1, Setbukti_foto1] = useState([]);
  const [bukti_foto2, Setbukti_foto2] = useState([]);
  const [bukti_foto3, Setbukti_foto3] = useState([]);
  const [bukti_vidio, Setbukti_vidio] = useState(null);
  const [deskripsi, Setdeskripsi] = useState([]);
  const [status_pengerjaan, Setstatus_pengerjaan] = useState([]);
  const [cara_penanganan, Setcara_penanganan] = useState([]);
  const [biaya_penanganan, Setbiaya_pengananan] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);
  const [komplainLanjutan, setKomplainLanjutan] = useState([]);
  const [nama_pengomplain, setNamaPengomplain] = useState([]);
  const [no_kontrakan, setNoKontrakan] = useState([]);

  const [cara_penanganan2, Setcara_penanganan2] = useState([]);
  const [biaya_penanganan2, Setbiaya_penanganan2] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    GetUserKomplainByID();
    BuktiVideoAdmin();
  }, []);

  const GetUserKomplainByID = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/komplain/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      Setnama_kendala(response.data.komplain.nama_kendala);
      Setbukti_foto1(response.data.komplain.bukti_foto1);
      Setbukti_foto2(response.data.komplain.bukti_foto2);
      Setbukti_foto3(response.data.komplain.bukti_foto3);
      Setbukti_vidio(response.data.komplain.bukti_vidio);
      Setdeskripsi(response.data.komplain.deskripsi);
      setKomplainLanjutan(response.data.komplain_lanjutan);
      Setstatus_pengerjaan(response.data.komplain.status_pengerjaan);
      Setcara_penanganan(response.data.komplain.cara_penanganan);
      Setbiaya_pengananan(response.data.komplain.biaya_penanganan);
      setCreatedAt(response.data.komplain.createdAt);
      setNamaPengomplain(response.data.komplain.user_id.nama_penyewa);
      setNoKontrakan(response.data.komplain.user_id.no_kontrakan);

      Setcara_penanganan2(response.data.komplain.cara_penanganan);
      Setbiaya_penanganan2(response.data.komplain.biaya_penanganan);
      console.log(komplainLanjutan);
    } catch (error) {
      console.log(error);
    }
  };

  const KonfirmasiKomplain = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    const status = parseInt(status_pengerjaan) + 1;
    try {
      // form.append("status_pengerjaan", status);
      // form.append("bukti_video_admin", bukti_video_admin);
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
      // return;
      navigate("/pengajuan-komplain");
    } catch (error) {
      console.log(error);
    }
  };

  const [bukti_video_admin, setBuktiVideoAdmin] = useState("");

  // upload bukti dari admin
  const BuktiVideoAdmin = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const form = new FormData();
      form.append("bukti_video_admin", bukti_video_admin);
      await axios.post(`http://localhost:5000/buktivideoadmin/${id}`, form, {
        headers: {
          Authorization: token,
        },
      });
      // return;
      // navigate("/pengajuan-komplain");
    } catch (error) {
      console.log(error);
    }
  };

  // tangani komplain lanjutan
  const TanganiBelumSelesai = async () => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    const status = parseInt(status_pengerjaan) - 3;
    try {
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
      // return;
      navigate("/pengajuan-komplain");
    } catch (error) {
      console.log(error);
    }
  };

  const InputPenganananBiaya = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:5000/komplain/${id}`,
        {
          cara_penanganan,
          biaya_penanganan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PengajuanKomplain />

      <div class="wrapper">
        <div class="container">
          <div class="panel-heading">
            <h3 class="panel-title">Detail keluhan penyewa kontrakan</h3>
          </div>
          {/* Page-Title */}
          <div class="panel">
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3">
                  <h3>Nama Penyewa :</h3>
                </div>
                <div class="col-md-9">
                  <h3>{nama_pengomplain}</h3>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Nomer Kontrakan :</h3>
                </div>
                <div class="col-md-9">
                  <h3>{no_kontrakan}</h3>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Kendala dialami :</h3>
                </div>
                <div class="col-md-9">
                  <h3>{nama_kendala}</h3>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Bukti Foto :</h3>
                </div>
                <div class="col-md-3 hover-zoomin">
                  <img width={120} src={bukti_foto1} alt={bukti_foto1} />
                </div>
                <div class="col-md-3 hover-zoomin">
                  <img width={120} src={bukti_foto2} alt={bukti_foto2} />
                </div>
                <div class="col-md-3 hover-zoomin">
                  <img width={120} src={bukti_foto3} alt={bukti_foto3} />
                </div>
                <div class="col-md-12">
                  <br />
                  <br />
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Bukti video :</h3>
                </div>
                <div class="col-md-9">
                  {bukti_vidio !== null && (
                    <video width={300} height={300} controls>
                      {/* <source src={coba} type="video/mp4" /> */}
                      <source src={bukti_vidio} type="video/mp4" />
                      {/* <source src="http://localhost:5000/1.mp4" /> */}
                    </video>
                  )}
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Deskripsi kendala</h3>
                </div>
                <div class="col-md-9">
                  <h3>
                    <small>{deskripsi}</small>
                  </h3>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Tanggal pengaduan</h3>
                </div>
                <div class="col-md-9">
                  <h3>
                    <small>{createdAt}</small>
                  </h3>
                </div>
                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3">
                  <h3>Status pengerjaan</h3>
                </div>

                {status_pengerjaan === "1" ? (
                  <>
                    <div class="col-md-3">
                      <div class="panel panel-color panel-danger">
                        <div class="panel-heading">
                          <h3 class="panel-title text-center ">
                            Belum diproses
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5">
                      <h3>Fungsi </h3>
                    </div>
                    <div class="col-md-1">
                      {/* <button
                        className="btn btn-info btn-lg"
                        onClick={() => KonfirmasiKomplain()}
                      >
                        Proses Komplain
                      </button> */}
                      <a
                        href="/pengajuan-komplain"
                        className="btn btn-success btn-lg"
                      >
                        Kembali
                      </a>
                    </div>{" "}
                    <div class="col-md-3 m-5">
                      <button
                        className="btn btn-info btn-lg"
                        onClick={() => KonfirmasiKomplain()}
                      >
                        Proses Komplain
                      </button>
                    </div>
                  </>
                ) : status_pengerjaan === "2" ? (
                  <>
                    <div class="col-md-3">
                      <div class="panel panel-color panel-info">
                        <div class="panel-heading">
                          <h3 class="panel-title text-center">
                            Sedang dalam proses pengerjaan
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <hr />
                    </div>

                    <div class="col-md-3">
                      <h3>Input bukti video</h3>
                    </div>
                    <div class="col-md-8">
                      <div class="fileupload btn btn-purple waves-effect waves-light">
                        <span>
                          <i class="ion-upload m-r-5"></i>Upload
                        </span>
                        <input
                          type="file"
                          class="upload"
                          accept="video/mp4,video/x-m4v,video/*"
                          onChange={(e) =>
                            setBuktiVideoAdmin(e.target.files[0])
                          }
                        />
                      </div>
                      {bukti_video_admin.name}
                    </div>

                    <div class="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5">
                      <h3>Fungsi </h3>
                    </div>
                    <div class="col-md-6 m-5">
                      <button
                        className="btn btn-success btn-lg"
                        onClick={() =>
                          KonfirmasiKomplain() && BuktiVideoAdmin()
                        }
                      >
                        Konfirmasi selesai
                      </button>
                    </div>
                  </>
                ) : status_pengerjaan === "3" ? (
                  <>
                    <div class="col-md-3">
                      <div class="panel panel-color panel-warning">
                        <div class="panel-heading">
                          <h3 class="panel-title text-center">
                            Menunggu konfirmasi penyewa
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5">
                      <h3>Fungsi</h3>
                    </div>
                    <div class="col-md-6 m-5">
                      <Link
                        to="/pengajuan-komplain"
                        className="btn btn-lg btn-info"
                      >
                        Kembali
                      </Link>
                    </div>
                  </>
                ) : status_pengerjaan === "4" ? (
                  <>
                    <div class="col-md-3">
                      <button class="btn btn-lg btn-success">
                        Komplain selesai
                      </button>
                    </div>
                    <div class="col-md-12">
                      <hr />
                    </div>

                    {cara_penanganan2 === undefined &&
                    biaya_penanganan2 === 0 ? (
                      <>
                        <form>
                          <div className="form-group">
                            <input
                              type="text"
                              onChange={(e) =>
                                Setcara_penanganan(e.target.value)
                              }
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Input Cara Perbaikan"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="number"
                              onChange={(e) =>
                                Setbiaya_pengananan(e.target.value)
                              }
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Biaya penanganan"
                            />
                          </div>
                          <div className="col-md-3"></div>
                          <div className="col-md-9">
                            <button
                              className="btn btn-primary btn-lg"
                              onClick={() => InputPenganananBiaya()}
                            >
                              Simpan
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <div class="col-md-3">
                          <h3>Cara penanganan :</h3>
                        </div>
                        <div class="col-md-9">
                          <h3>{cara_penanganan}</h3>
                        </div>
                        <div class="col-md-12">
                          <hr />
                        </div>
                        <div class="col-md-3">
                          <h3>Biaya penanganan :</h3>
                        </div>
                        <div class="col-md-9">
                          <h3>Rp.{biaya_penanganan}</h3>
                        </div>
                      </>
                    )}
                    <div class="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3">
                      <h3>Fungsi</h3>
                    </div>
                    <div class="col-md-6 m-5">
                      <Link
                        to="/pengajuan-komplain"
                        className="btn btn-info btn-lg"
                      >
                        Kembali
                      </Link>
                    </div>
                  </>
                ) : status_pengerjaan === "5" ? (
                  <>
                    <div class="col-md-3">
                      <button class="btn btn-lg btn-danger">
                        Komplain belum selesai
                      </button>
                    </div>
                    <div class="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5"></div>
                    <div class="col-md-6 m-5">
                      <div className="col-md-3">
                        <button
                          onClick={() => TanganiBelumSelesai()}
                          className="btn btn-info btn-lg"
                        >
                          Proses
                        </button>
                      </div>
                      <div className="col-md-9">
                        <Link
                          to="/pengajuan-komplain"
                          className="btn btn-danger btn-lg"
                        >
                          Kembali
                        </Link>
                      </div>
                    </div>
                  </>
                ) : null}

                {komplainLanjutan.map((row, index) => {
                  return (
                    <>
                      <div class="col-md-12">
                        <hr />
                      </div>
                      <div class="col-md-3 m-5"></div>
                      <div class="col-md-3 m-5">
                        <strong>Info penolakan komplain {++index}</strong>
                      </div>
                      <div class="col-md-12 m-5">
                        <hr />
                      </div>
                      <div class="col-md-3">
                        <h3>Bukti Foto :</h3>
                      </div>
                      <div class="col-md-3 hover-zoomin">
                        <img
                          width={120}
                          src={row.bukti_foto1}
                          alt={row.bukti_foto1}
                        />
                      </div>
                      <div class="col-md-3 hover-zoomin">
                        <img
                          width={120}
                          src={row.bukti_foto2}
                          alt={row.bukti_foto2}
                        />
                      </div>
                      <div class="col-md-3 hover-zoomin">
                        <img
                          width={120}
                          src={row.bukti_foto3}
                          alt={row.bukti_foto3}
                        />
                      </div>
                      <div class="col-md-12">
                        <br />
                        <br />
                        <hr />
                      </div>
                      <div class="col-md-3">
                        <h3>Bukti video :</h3>
                      </div>
                      <div class="col-md-9">
                        {row.bukti_vidio !== null && (
                          <video width={300} height={300} controls>
                            {/* <source src={coba} type="video/mp4" /> */}
                            <source src={row.bukti_vidio} type="video/mp4" />
                            {/* <source src="http://localhost:5000/1.mp4" /> */}
                          </video>
                        )}
                      </div>

                      <div class="col-md-12">
                        <hr />
                      </div>
                      <div class="col-md-3">
                        <h3>Deskripsi kendala :</h3>
                      </div>
                      <div class="col-md-9">
                        <h3>
                          <small>{row.deskripsi}</small>
                        </h3>
                      </div>
                      <div class="col-md-12">
                        <hr />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>

            {/* end: page */}
          </div>{" "}
          {/* end Panel */}
          {/*  */}
          {/* Footer */}
        </div>
        {/* end container */}
      </div>
    </>
  );
};

export default DetailPengajuanKomplain;
