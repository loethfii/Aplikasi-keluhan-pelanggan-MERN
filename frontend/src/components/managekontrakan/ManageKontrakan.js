import React, { useState, useEffect } from "react";
import ManageKontrakanNavbar from "../navbar/ManageKontrakanNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageKontrakan = () => {
  const [Kontrakans, setKontrakan] = useState([]);

  useEffect(() => {
    getKontrakans();
  }, []);

  const token = localStorage.getItem("token");
  const getKontrakans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/masterkontrakan",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setKontrakan(response.data);

      //  http://localhost:5000/masterkontrakan
    } catch (error) {
      console.log(error);
    }
  };

  //hapus kontrkana
  const deleteKontrakan = async (id) => {
    try {
      let konfirmasi = confirm("Yakin mau hapus ?");
      if (konfirmasi === true) {
        await axios.delete(`http://localhost:5000/masterkontrakan/${id}`, {
          headers: {
            Authorization: token,
          },
        });
      }
      getKontrakans();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ManageKontrakanNavbar />
      <div className="wrapper">
        <div className="container">
          {/* Page-Title */}
          <div className="row">
            <div className="col-md-6">
              <h4>Daftar Kontrakan</h4>
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-6">
                  <div className="m-b-30">
                    <Link
                      to="/manage-kontrakan/create"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Tambah Kontrakan <i className="fa fa-plus"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead class="info">
                  <tr>
                    <th width="6">NO</th>
                    <th>No Kontrakan</th>
                    <th>Created At</th>
                    <th>Update At</th>
                    <th width="180">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {Kontrakans.map((kontrakan, index) => (
                    <tr key={kontrakan.index}>
                      <td>{++index}</td>
                      <td>{kontrakan.no_kontrakan}</td>
                      <td>{kontrakan.createdAt}</td>
                      <td>{kontrakan.updatedAt}</td>
                      <td>
                        <Link
                          to={`/manage-kontrakan/edit/${kontrakan._id}`}
                          className="btn btn-info badge"
                        >
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          onClick={() => deleteKontrakan(kontrakan._id)}
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
          <footer className="footer text-right">
            <div className="container">
              <div className="row">
                <div className="col-xs-6">2016 © Moltran.</div>
                <div className="col-xs-6">
                  <ul className="pull-right list-inline m-b-0">
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Help</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          {/* End Footer */}
        </div>
        {/* end container */}
      </div>
      {/* end wrapper */}
      {/*  */}
    </div>
  );
};

export default ManageKontrakan;
