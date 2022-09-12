import NavbarIndex from "./navbar/NavbarIndex";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Index = ({ userProfile }) => {
  const [semuakomplain, setSemuaKomplain] = useState([]);
  const [belumdiproses, setBelumDiproses] = useState([]);
  const [statusSedangdiproses, setStatusSedangDiproses] = useState([]);
  const [menungguKonfirmasi, setMenungguKonfirmasi] = useState([]);
  const [statuskeluhanselesai, setStatusKeluhanSelesai] = useState([]);
  const [statusbelumselesai, setStatusBelumSelesai] = useState([]);

  useEffect(() => {
    GetKomplain();
    GetBelumDiproses();
    GetStatusSedangDiproses();
    GetMenungguKonfirmasi();
    GetKeluhanSelesai();
    GetStatusBelumSelesai();
  }, []);
  const GetKomplain = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/komplain", {
        headers: {
          Authorization: token,
        },
      });
      setSemuaKomplain(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetBelumDiproses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/belumdiproses", {
        headers: {
          Authorization: token,
        },
      });
      setBelumDiproses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetStatusSedangDiproses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/statussedangproses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setStatusSedangDiproses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetMenungguKonfirmasi = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/statusmenunggukonfirmasi",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMenungguKonfirmasi(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetKeluhanSelesai = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/statuskeluhanselesai",
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

  const GetStatusBelumSelesai = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/statuskeluhanbelumselesai",
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

  return (
    <div>
      <NavbarIndex />
      <div className="wrapper">
        <div className="container">
          {/* Page-Title */}
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">
                Selamat datang ! {userProfile.nama_penyewa}
              </h4>
            </div>
          </div>

          {/* Start Widget */}
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-3">
              <div className="mini-stat clearfix bx-shadow bg-info">
                <span className="mini-stat-icon">
                  <i className="ion-archive"></i>
                </span>
                <div className="mini-stat-info text-right">
                  <span className="">{semuakomplain.length}</span>
                  Semua Keluhan
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      keluhan masuk <span className="pull-right"></span>
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
                  <span className="counter">{belumdiproses.length}</span>
                  Belum Diproses
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      Keluhan masuk <span className="pull-right"></span>
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
                  <span className="">{statusSedangdiproses.length}</span>
                  Sedang Dalam Proses
                </div>
                <div className="tiles-progress">
                  <div className="m-t-20">
                    <h5 className="text-uppercase text-white m-0">
                      Keluhan masuk <span className="pull-right"></span>
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
                      Keluhan masuk
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
                  <span className="text-dark">{menungguKonfirmasi.length}</span>
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

          {/* End row*/}
        </div>
        {/* end container */}
      </div>
    </div>
  );
};

export default Index;
