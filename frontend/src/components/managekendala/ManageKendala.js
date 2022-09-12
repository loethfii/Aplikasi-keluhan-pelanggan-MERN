import React, { useState, useEffect } from "react";
import ManageKendalaNavbar from "../navbar/ManageKendalaNavbar";
import { Link } from "react-router-dom";

import axios from "axios";

const ManageKendala = () => {
  const [Kendalas, setKendala] = useState([]);

  useEffect(() => {
    getKendalas();
  }, []);
  const token = localStorage.getItem("token");
  const getKendalas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/masterkendala", {
        headers: {
          Authorization: token,
        },
      });
      setKendala(response.data);

      //  http://localhost:5000/masterkendala
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKendala = async (id) => {
    try {
      let konfirmasi = confirm("Yakin mau hapus ?");
      if (konfirmasi === true) {
        await axios.delete(`http://localhost:5000/masterkendala/${id}`, {
          headers: {
            Authorization: token,
          },
        });
      }
      getKendalas();
    } catch (error) {
      console.log(error);
    }
  };

  const ConfirmDelete = (id) => {
    let konfirmasi = confirm("Yakin mau delete");

    if (typeof konfirmasi === true) {
      () => deleteKendala(id);
      alert("Berhasil menghapus");
    } else {
      console.log("gagal delete");
    }
  };
  return (
    <>
      <div>
        <ManageKendalaNavbar />
        <div className="wrapper">
          <div className="container">
            {/* Page-Title */}
            <div className="row">
              <div className="col-md-6">
                <h4>Daftar Kendala</h4>
              </div>
            </div>
            <div className="panel">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="m-b-30">
                      <Link
                        to="/manage-kendala/create"
                        className="btn btn-primary waves-effect waves-light"
                      >
                        {" "}
                        Tambah Kendala <i className="fa fa-plus"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <table className="table table-bordered">
                  <thead class="info">
                    <tr>
                      <th width="6">NO</th>
                      <th>Jenis Kendala</th>
                      <th>Estimasi pengerjaan</th>
                      <th>Created At</th>
                      <th>Update At</th>
                      <th width="180">Fungsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Kendalas.map((kendala, index) => (
                      <tr key={kendala.index}>
                        <td>{++index}</td>
                        <td>{kendala.nama_kendala}</td>
                        <td>{kendala.estimasi}</td>
                        <td>{kendala.createdAt}</td>
                        <td>{kendala.updatedAt}</td>
                        <td>
                          <Link
                            to={`/manage-kendala/edit/${kendala._id}`}
                            className="btn btn-info badge"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => deleteKendala(kendala._id)}
                            // onClick={() => deleteUser(user._id)}
                            className="btn btn-danger badge"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* end: page */}
            </div>{" "}
            {/* end Panel */}
            {/* Footer */}
            {/* End Footer */}
          </div>
          {/* end container */}
        </div>
      </div>
    </>
  );
};

export default ManageKendala;
