import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import UserNavbar from "./header/UserNavbar";
import axios from "axios";

const IndexPengajuanKomplain = ({ userProfile }) => {
  const [semuakomplainID, setSemuaKomplainID] = useState([]);
  const [statusbelumdiproses, setStatusBelumDiproses] = useState([]);
  const [statussedangdalamproses, setStatusSedangDalamProses] = useState([]);
  const [statusmenunggukonfirmasi, setStatusMenungguKonfirmasi] = useState([]);
  const [statuskeluhanselesai, setStatusKeluhanSelesai] = useState([]);
  const [statusbelumselesai, setStatusBelumSelesai] = useState([]);

  useEffect(() => {
    GetSemuaKomplain();
    GetStatusBelumDiproses();
    GetStatusSedangDalamProses();
    GetStatusSedangDalamKonfirmasi();
    GetStatusKeluhanSelesai();
    GetStatusKeluhanBelumSelesai();
  }, []);

  const GetSemuaKomplain = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/komplainuser", {
        headers: {
          Authorization: token,
        },
      });
      setSemuaKomplainID(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusBelumDiproses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/usersstatusbelumdiproses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusBelumDiproses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusSedangDalamProses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/usersstatussedangdalamproses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusSedangDalamProses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusSedangDalamKonfirmasi = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/usersstatusmenunggukonfirmasi",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusMenungguKonfirmasi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusKeluhanSelesai = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/usersstatuskeluhanselesai",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusKeluhanSelesai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusKeluhanBelumSelesai = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/usersstatusbelumselesai",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusBelumSelesai(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //http://localhost:5000/usersstatusbelumdiproses
  return (
    <>
      <UserNavbar />
      <div className="wrapper">
        <div className="container">
          {/*  */}
          {/* Page-Title */}
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">
                {" "}
                Selamat datang ! {userProfile.nama_penyewa}
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bx-shadow bg-info">
                <span className="mini-stat-icon">
                  <i className="ion-archive"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{semuakomplainID.length}</span>
                  Semua Keluhan
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      keluhan saya <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bg-inverse bx-shadow">
                <span className="mini-stat-icon">
                  <i className="ion-close-circled"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{statusbelumdiproses.length}</span>
                  Belum Diproses
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      keluhan saya <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bg-primary bx-shadow">
                <span className="mini-stat-icon">
                  <i className="fa fa-spin fa-gear"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{statussedangdalamproses.length}</span>
                  Sedang Dalam Proses
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      keluhan saya <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bg-success bx-shadow">
                <span className="mini-stat-icon">
                  <i className="fa fa-check-circle"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{statuskeluhanselesai.length}</span>
                  Keluhan Selesai
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      keluhan saya
                      <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-3 col-lg-3 "></div>

            <div className="col-md-6 col-sm-6 col-lg-3  ">
              <div className="mini-stat clearfix bg-warning bx-shadow">
                <span className="mini-stat-icon">
                  <i className="fa fa-warning"></i>
                </span>
                <div className="mini-stat-info text-right text-dark">
                  <span className="text-dark">
                    {statusmenunggukonfirmasi.length}
                  </span>
                  Menunggu konfirmasi
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0 text-dark">
                      Keluhan masuk
                      <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bg-danger bx-shadow">
                <span className="mini-stat-icon">
                  <i className="fa fa-warning"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{statusbelumselesai.length}</span>
                  Keluhan Belum Selesai
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      Keluhan masuk
                      <span className="pull-right"></span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPengajuanKomplain;
