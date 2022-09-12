import React, { useState, useEffect } from "react";
import ManageUserNavbar from "../navbar/ManageUserNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  //menampilkan data user
  const token = localStorage.getItem("token");
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/user", {
      headers: {
        Authorization: token,
      },
    });
    setUser(response.data);
    // console.log(users.length);
  };

  //delete user
  const deleteUser = async (id) => {
    try {
      let konfirmasi = confirm("Yakin mau hapus ?");
      if (konfirmasi === true) {
        await axios.delete(`http://localhost:5000/user/${id}`, {
          headers: {
            Authorization: token,
          },
        });
      }
      getUsers();
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
                    <a
                      href="/manage-user/create"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      Tambah user <i className="fa fa-plus"></i>
                    </a>
                  </div>
                </div>
                <div className="col-sm-1">
                  <div className="m-b-30">
                    <Link
                      to="/manage-user/daftar-blokir"
                      className="btn btn-warning waves-effect waves-light"
                    >
                      Daftar user terblokir
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-bordered">
                <thead class="info">
                  <tr>
                    <th width="6">NO</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Nama Penyewa</th>
                    <th>Role</th>
                    <th>No Kontrakan</th>
                    <th>Tanggal dibuat</th>
                    <th>Tanggal diupdate</th>
                    <th width="180">Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td className="text-center">{++index}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.nama_penyewa}</td>
                      <td className="text-center">
                        {user.role === "1" ? (
                          <div className="btn btn-purple">Admin</div>
                        ) : (
                          <div className="btn btn-info">User</div>
                        )}
                      </td>
                      <td className="text-center">{user.no_kontrakan}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.updatedAt}</td>

                      {user.role === "1" ? (
                        <td>
                          {/* <Link
                            to={`/manage-user/edit/${user._id}`}
                            className="btn btn-info badge"
                          >
                            Edit
                          </Link> */}
                        </td>
                      ) : (
                        <td>
                          <Link
                            to={`/manage-user/edit/${user._id}`}
                            className="btn btn-info badge"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="btn btn-danger badge"
                          >
                            Delete
                          </button>
                        </td>
                      )}
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

      {/* MODAL */}
      <div id="dialog" className="modal-block mfp-hide">
        <section className="panel panel-info panel-color">
          <header className="panel-heading">
            <h2 className="panel-title">Are you sure?</h2>
          </header>
          <div className="panel-body">
            <div className="modal-wrapper">
              <div className="modal-text">
                <p>Are you sure that you want to delete this row?</p>
              </div>
            </div>

            <div className="row m-t-40">
              <div className="col-md-12 text-right">
                <button
                  id="dialogConfirm"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Confirm
                </button>
                <button
                  id="dialogCancel"
                  className="btn btn-default waves-effect"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* end Modal */}
    </div>
  );
};

export default ManageUser;
