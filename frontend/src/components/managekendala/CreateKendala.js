import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ManageKendalaNavbar from "../navbar/ManageKendalaNavbar";

const CreateKendala = () => {
  const [nama_kendala, setNamaKendala] = useState("");
  const [estimasi, SetEstimasi] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const saveKendala = async (e) => {
    try {
      await axios.post(
        `http://localhost:5000/masterkendala`,
        {
          nama_kendala,
          estimasi,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <ManageKendalaNavbar />
      <div className="wrapper">
        <div className="container">
          {/*  */}
          {/* konten */}
          <div className="panel">
            <div className="panel-body">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Input Daftar Kendala</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={saveKendala} action="/manage-kendala">
                      <div className="form-group">
                        <label for="exampleInputPassword1">
                          Input Nama Kendala
                        </label>
                        <input
                          type="text"
                          value={nama_kendala}
                          onChange={(e) => setNamaKendala(e.target.value)}
                          className="form-control"
                          required
                          placeholder="Kendala"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">
                          Estimasi pengerjaan
                        </label>
                        {/* <input
                          type="text"
                          value={nama_kendala}
                          onChange={(e) => setNamaKendala(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Kendala"
                        /> */}
                        <select
                          value={estimasi}
                          onChange={(e) => SetEstimasi(e.target.value)}
                          className="form-control"
                          required
                        >
                          <option label="Pilih estimasi" disabled></option>
                          <option value="1 sampai 4 jam">1 sampai 4 jam</option>
                          <option value="1 sampai 7 jam">1 sampai 7 jam</option>
                          <option value="1 sampai 12 jam">
                            1 sampai 12 jam
                          </option>
                          <option value="> 1 hari">{"> 1 hari"}</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <table width="200">
                          <tr>
                            <td>
                              <Link
                                to="/manage-kendala"
                                className="btn btn-info"
                              >
                                Kembali
                              </Link>
                            </td>
                            <td>
                              <button
                                type="submit"
                                className="btn btn-purple waves-effect waves-light"
                              >
                                Simpan
                              </button>
                            </td>
                          </tr>
                        </table>
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
          {/* End konten */}
        </div>
      </div>
    </div>
  );
};

export default CreateKendala;
