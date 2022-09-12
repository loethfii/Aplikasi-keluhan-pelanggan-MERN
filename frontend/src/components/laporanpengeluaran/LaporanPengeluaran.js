import React, { useEffect, useState } from "react";
import LaporanPengeluaranNavbar from "../navbar/LaporanPengeluaranNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const LaporanPengeluaran = () => {
  const [tanggalawal, setTanggalAwal] = useState([]);
  const [tanggalakhir, setTanggalAkhir] = useState([]);

  // const [nokontrakan, setNoKontrakan] = useState([]);
  // const [keluhan, setKeluhan] = useState([]);
  // const [caraperbaikan, setCaraPerbaikan] = useState([]);
  // const [biayapenanganan, setBiayaPenanganan] = useState([]);

  const [komplains, setKomplains] = useState([]);
  const [biaya, Setbiaya] = useState([]);

  useEffect(() => {
    PilihTanggal();
  }, []);

  const PilihTanggal = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/komplain?tanggalawal=${tanggalawal}&tanggalakhir=${tanggalakhir}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKomplains(response.data);
      Setbiaya(response.data.biaya_penanganan);
    } catch (error) {
      console.log(error);
    }
  };

  // if (biaya != undefined) {
  //   function sum() {
  //     let sum = 0;
  //     for (let value of komplains) {
  //       sum += value.biaya_penanganan;
  //     }
  //     console.log(sum);
  //   }
  // }

  let sum = 0;
  for (let value of komplains) {
    sum += value.biaya_penanganan;
  }
  console.log(sum);
  return (
    <>
      <LaporanPengeluaranNavbar />
      <div class="wrapper">
        <div class="container printdong">
          {/* Page-Title */}
          <div class="row">
            <div class="col-md-12">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Laporan Pengeluaran Perbaikan</h3>
                </div>
                <div class="panel-body">
                  <div class="row">
                    <form action="">
                      <div className="col-md-2">
                        <h4> Dari tanggal :</h4>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          className="form-control"
                          value={tanggalawal}
                          onChange={(e) => setTanggalAwal(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12"></div>
                      <div className="col-md-12"></div>

                      <div className="col-md-2">
                        <h4> Sampai tanggal :</h4>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          className="form-control"
                          value={tanggalakhir}
                          onChange={(e) => setTanggalAkhir(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12"></div>
                      <div className="col-md-4"></div>
                      <div className="col-md-3 hapus" id="hapus">
                        <button
                          type="button"
                          className="btn btn-purple waves-effect waves-light "
                          onClick={() => PilihTanggal()}
                        >
                          Cari
                        </button>
                      </div>
                    </form>

                    <div className="col-md-12" id="hapus2">
                      <hr />
                    </div>
                    <table className="table table-bordered ">
                      <thead className="info">
                        <tr>
                          <td width={12}>No</td>
                          <td width={137}>Nomer Kontrakan</td>
                          <td>Keluhan</td>
                          <td>Cara Perbaikan</td>

                          <td>Biaya Penanganan</td>
                        </tr>
                      </thead>
                      <tbody>
                        {komplains.map((row, index) => (
                          <tr key={row._id}>
                            <td>{++index}</td>
                            <td>{row.user_id.no_kontrakan}</td>
                            <td>{row.nama_kendala}</td>
                            <td>{row.cara_penanganan}</td>
                            <td>{row.biaya_penanganan}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="info">
                        <tr>
                          <td colSpan={4}>Total Pengeluaran</td>
                          <td>{sum}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div id="hapus3">
                      <button
                        className="btn btn-success btn-md"
                        onClick={() => window.print()}
                      >
                        Print
                      </button>
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
    </>
  );
};

export default LaporanPengeluaran;
