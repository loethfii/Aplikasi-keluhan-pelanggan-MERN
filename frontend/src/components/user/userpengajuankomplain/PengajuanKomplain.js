import React, { useState, useEffect } from "react";
import PengajuanKomplainNavbar from "../header/PengajuanKomplainNavbar";

import axios from "axios";
import { Link } from "react-router-dom";

const PengajuanKomplain = () => {
  const [komplains, setKomplain] = useState([]);

  useEffect(() => {
    getKomplains();
  }, []);

  const getKomplains = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/komplainuser", {
        headers: {
          Authorization: token,
        },
      });
      setKomplain(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PengajuanKomplainNavbar />

      <div className="wrapper">
        <div className="container">
          {/* Page-Title */}
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title"> Daftar Keluhan Anda</h4>
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="m-b-30">
                    <a
                      href="/user/pengajuan-komplain/create"
                      class="btn btn-primary waves-effect waves-light"
                    >
                      Ajukan Keluhan <i class="fa fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
              <table
                className="table table-bordered table-striped"
                id="datatable-editable"
              >
                <thead>
                  <tr>
                    <th width="10">No</th>
                    <th>Kendala</th>
                    <th>Estimasi pengerjaan</th>
                    <th>Status pengerjaan</th>
                    <th>Tanggal Komplain</th>
                    <th>Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {komplains.map((komplain, index) => (
                    <tr key={komplain._id}>
                      <td>{++index}</td>
                      <td>{komplain.nama_kendala}</td>
                      <td>{komplain.estimasi}</td>
                      <td>
                        {komplain.status_pengerjaan === "1" ? (
                          <div class="col-md-3">
                            <button class="btn btn-lg btn-danger badge">
                              Belum diproses
                            </button>
                          </div>
                        ) : komplain.status_pengerjaan === "2" ? (
                          <div class="col-md-3">
                            <button class="btn btn-lg btn-info badge">
                              Sedang dalam proses
                            </button>
                          </div>
                        ) : komplain.status_pengerjaan === "3" ? (
                          <div class="col-md-3">
                            <button class="btn btn-lg btn-warning badge">
                              Menunggu konfirmasi penyewa
                            </button>
                          </div>
                        ) : komplain.status_pengerjaan === "4" ? (
                          <div class="col-md-3">
                            <button class="btn btn-lg btn-success badge">
                              Komplain selesai
                            </button>
                          </div>
                        ) : komplain.status_pengerjaan === "5" ? (
                          <div class="col-md-3">
                            <button class="btn btn-lg btn-danger badge">
                              Komplain belum selesai
                            </button>
                          </div>
                        ) : null}
                      </td>
                      <td>{komplain.createdAt}</td>
                      <td>
                        <Link
                          to={`/user/pengajuan-komplain/detail/${komplain._id}`}
                          className="btn btn-info badge"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* end: page */}
          </div>{" "}
          {/* end Panel */}
        </div>
        {/* end container */}
      </div>
      {/*  */}
      {/* end wrapper */}
    </>
  );
};

export default PengajuanKomplain;
