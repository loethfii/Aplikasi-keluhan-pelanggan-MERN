import React, { useState, useEffect } from "react";
import PengajuanKomplainNavbar from "../header/PengajuanKomplainNavbar";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const DetailKomplain = () => {
  const [nama_kendala, Setnama_kendala] = useState([]);
  const [estimasi, Setestimasi] = useState([]);
  const [bukti_foto1, Setbukti_foto1] = useState([]);
  const [bukti_foto2, Setbukti_foto2] = useState([]);
  const [bukti_foto3, Setbukti_foto3] = useState([]);
  const [bukti_vidio, Setbukti_vidio] = useState(null);
  const [deskripsi, Setdeskripsi] = useState([]);
  const [status_pengerjaan, Setstatus_pengerjaan] = useState([]);
  const [bukti_video_admin, SetBukti_Video_Admin] = useState(null);
  const [createdAt, setCreatedAt] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDetailKomplainById();
  }, []);

  const getDetailKomplainById = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/komplainuser/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    Setnama_kendala(response.data.komplain.nama_kendala);
    Setbukti_foto1(response.data.komplain.bukti_foto1);
    Setbukti_foto2(response.data.komplain.bukti_foto2);
    Setbukti_foto3(response.data.komplain.bukti_foto3);
    Setbukti_vidio(response.data.komplain.bukti_vidio);
    Setdeskripsi(response.data.komplain.deskripsi);
    Setstatus_pengerjaan(response.data.komplain.status_pengerjaan);
    setCreatedAt(response.data.komplain.createdAt);
    Setestimasi(response.data.komplain.estimasi);
    SetBukti_Video_Admin(response.data.komplain.bukti_video_admin);
  };

  const FinalConfirmation = async () => {
    const status = parseInt(status_pengerjaan) + 1;
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
      <PengajuanKomplainNavbar />

      <div class="wrapper">
        <div class="container">
          {/* Page-Title */}
          <div class="panel">
            <div class="panel-body">
              <div class="row">
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
                  <h3>Estimasi pengerjaan :</h3>
                </div>
                <div class="col-md-9">
                  <h3>{estimasi}</h3>
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
                  <div class="col-md-3">
                    <button class="btn btn-lg btn-danger">
                      Belum diproses
                    </button>
                  </div>
                ) : status_pengerjaan === "2" ? (
                  <div class="col-md-3">
                    <button class="btn btn-lg btn-info">
                      Sedang dalam proses
                    </button>
                  </div>
                ) : status_pengerjaan === "3" ? (
                  <>
                    <div class="col-md-3">
                      <div class="panel panel-color panel-info">
                        <div class="panel-heading">
                          <h3 class="panel-title text-center">
                            Menunggu konfirmasi anda
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5">
                      <h3>Bukti pengerjaan </h3>
                    </div>
                    <div class="col-md-9 m-5">
                      {bukti_vidio !== null && (
                        <video width={300} height={300} controls>
                          {/* <source src={coba} type="video/mp4" /> */}
                          <source src={bukti_video_admin} type="video/mp4" />
                          {/* <source src="http://localhost:5000/1.mp4" /> */}
                        </video>
                      )}
                    </div>
                    <div className="col-md-12">
                      <hr />
                    </div>
                    <div class="col-md-3 m-5">
                      <h3>Fungsi</h3>
                    </div>

                    <div class="col-md-9 m-5">
                      <strong>
                        Apakah komplain sudah selesai ? Tekan (Tolak) jika
                        komplain belum beres
                      </strong>
                    </div>
                    <div className="col-md-12">
                      <br />
                    </div>
                    <div class="col-md-3 m-5"></div>
                    <div class="col-md-6 m-5">
                      <div className="col-md-3">
                        <button
                          className="btn btn-info btn-lg"
                          onClick={() => FinalConfirmation()}
                        >
                          Konfirmasi
                        </button>
                      </div>
                      <div className="col-md-9">
                        <Link
                          to={`/user/pengajuan-komplain/komplain_2/${id}`}
                          className="btn btn-danger btn-lg"
                        >
                          Tolak
                        </Link>
                      </div>
                    </div>
                  </>
                ) : status_pengerjaan === "4" ? (
                  <div class="col-md-3">
                    <button class="btn btn-lg btn-success">
                      Komplain selesai
                    </button>
                  </div>
                ) : status_pengerjaan === "5" ? (
                  <div class="col-md-3">
                    <button class="btn btn-lg btn-danger">Belum selesai</button>
                  </div>
                ) : null}

                <div class="col-md-12">
                  <hr />
                </div>

                <div class="col-md-3 m-5"></div>
                <div class="col-md-6 m-5">
                  <Link
                    to="/user/pengajuan-komplain"
                    class="btn btn-warning btn-lg"
                  >
                    Kembali
                  </Link>
                </div>
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

export default DetailKomplain;
