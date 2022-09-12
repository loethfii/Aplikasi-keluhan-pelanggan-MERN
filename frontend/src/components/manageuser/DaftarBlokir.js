import React, { useState, useEffect } from "react";
import ManageUserNavbar from "../navbar/ManageUserNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const DaftarBlokir = () => {
  const [IsDaftarBlokir, setIsDaftarBlokir] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    GetDaftarBlokir();
  }, []);

  const GetDaftarBlokir = async () => {
    try {
      const response = await axios.get("http://localhost:5000/daftarblokir", {
        headers: {
          Authorization: token,
        },
      });
      setIsDaftarBlokir(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteDaftarBlokir = async (id) => {
    try {
      let konfirmasi = confirm("Yakin mau hapus ?");
      if (konfirmasi === true) {
        await axios.delete(`http://localhost:5000/daftarblokir/${id}`, {
          headers: {
            Authorization: token,
          },
        });
      }
      GetDaftarBlokir();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ManageUserNavbar />
      <div className="wrapper">
        <div className="container">
          {/* Page-Title */}
          <div className="row">
            <div className="col-md-6">
              <h4>Daftar Users</h4>
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-10">
                  <div className="m-b-30">
                    <Link
                      to="/manage-user"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Kembali ke depan
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead class="info">
                  <tr>
                    <th width="6">NO</th>
                    <th>Email</th>
                    <th width="180">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {IsDaftarBlokir.map((row, index) => (
                    <tr key={row._id}>
                      <td>{++index}</td>
                      <td>{row.email}</td>
                      <td>
                        <button
                          onClick={() => DeleteDaftarBlokir(row._id)}
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

      {/* end Modal */}
    </div>
  );
};

export default DaftarBlokir;
