import React, { useEffect, useState } from "react";
import PengajuanKomplainNav from "../navbar/PengajuanKomplain";
import axios from "axios";
import { Link } from "react-router-dom";

const PengajuanKomplain = () => {
  const [komplains, setKomplains] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPengajuanKomplain();
  }, []);

  const getPengajuanKomplain = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/komplain", {
        headers: {
          Authorization: token,
        },
      });
      setKomplains(response.data);
      console.log(komplains);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PengajuanKomplainNav />
      <div class="wrapper">
        <div class="container">
          {/* Page-Title */}
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Daftar keluhan penyewa kontrakan</h3>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table
                        id="datatable"
                        class="table table-striped table-bordered"
                      >
                        <thead>
                          <tr>
                            <th width="12">No</th>
                            <th>Nama penyewa</th>
                            <th>Nomer kontrakan</th>
                            <th>Kendala yang diajukan</th>
                            <th>Status</th>
                            <th>Tanggal komplain</th>
                            <th>fungsi</th>
                          </tr>
                        </thead>

                        <tbody>
                          {komplains.map((komplain, index) => (
                            <tr key={komplain._id}>
                              <td>{++index}</td>
                              <td>{komplain.user_id.nama_penyewa}</td>
                              <td>{komplain.user_id.no_kontrakan}</td>
                              <td>{komplain.nama_kendala}</td>
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
                                  <>
                                    <div class="col-md-3">
                                      <button class="btn btn-lg btn-warning badge">
                                        Menunggu konfirmasi penyewa
                                      </button>
                                    </div>
                                  </>
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
                                  to={`/pengajuan-komplain/detail/${komplain._id}`}
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
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* End Row */}
          {/*  */}
        </div>
        {/* end container */}
      </div>
      {/* end wrapper */}
    </>
  );
};

export default PengajuanKomplain;
