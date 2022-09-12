import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import ManageKendalaNavbar from "../navbar/ManageKendalaNavbar";

const EditKendala = () => {
  const [nama_kendala, setNama_kendala] = useState("");
  const [estimasi, setEstimasi] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getKendalaById();
  }, []);

  const token = localStorage.getItem("token");
  const getKendalaById = async () => {
    const response = await axios.get(
      `http://localhost:5000/masterkendala/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setNama_kendala(response.data.nama_kendala);
    setEstimasi(response.data.estimasi);
  };

  const UpdateKendala = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/masterkendala/${id}`,
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
      navigate("/manage-kendala");
    } catch (error) {
      console.log(error);
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
                    <h3 className="panel-title">Edit Data Kendala</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={UpdateKendala}>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Kendala</label>
                        <input
                          type="text"
                          value={nama_kendala}
                          onChange={(e) => setNama_kendala(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Nomer kontrakan"
                        />
                      </div>

                      <div className="form-group">
                        <label for="exampleInputPassword1">
                          Estimasi Pengerjaan
                        </label>
                        {/* <input
                          type="text"
                          value={nama_kendala}
                          onChange={(e) => setNama_kendala(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Nomer kontrakan"
                        /> */}
                        {estimasi}
                        <select
                          name=""
                          value={estimasi}
                          onChange={(e) => setEstimasi(e.target.value)}
                          className="form-control"
                          id=""
                        >
                          <option value="1 sampai 4 jam">1 sampai 4 jam</option>
                          <option value="1 sampai 7 jam">1 sampai 7 jam</option>
                          <option value="1 sampai 12 jam">
                            1 sampai 12 jam
                          </option>
                          <option value="> 1 hari">{"> 1 hari"}</option>
                        </select>
                      </div>

                      <tr>
                        <td>
                          <td className="col-sm-5">
                            <Link to="/manage-kendala" className="btn btn-info">
                              Kembali
                            </Link>
                          </td>
                        </td>
                        <td className="col-sm-5">
                          <button
                            type="submit"
                            className="btn btn-purple waves-effect waves-light"
                          >
                            Simpan
                          </button>
                        </td>
                      </tr>
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

export default EditKendala;
