import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";

import ManageUserNavbar from "../navbar/ManageUserNavbar";

const CreateUser = () => {
  // email,password,nama_penyewa,role,no_kontrakan
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [nama_penyewa, setNama_penyewa] = useState("");
  const [msg, setMsg] = useState([]);
  // const [role, setRole] = useState("");
  const [no_kontrakan, setNo_kontrakan] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const SaveUser = async (e) => {
    e.preventDefault();
    // return;
    try {
      await axios.post(
        `http://localhost:5000/user`,
        {
          email,
          password,
          nama_penyewa,
          // role,
          no_kontrakan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/manage-user");
    } catch (er) {
      setMsg(er.response.data.message);
    }
  };

  //get data nomer kontrakan
  const [Kontrakans, setKontrakan] = useState([]);

  useEffect(() => {
    getKontrakans();
  }, []);

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

  console.log(msg);

  return (
    <div>
      <ManageUserNavbar />
      <div className="wrapper">
        <div className="container">
          {/*  */}
          {/* konten */}
          <div className="panel">
            <div className="panel-body">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Input Data User Pengontrak</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={SaveUser}>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="exampleInputEmail1"
                          required
                          placeholder="Input email"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="text"
                          value={password}
                          onChange={(e) => setPasword(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          required
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Nama Penyewa</label>
                        <input
                          type="text"
                          value={nama_penyewa}
                          onChange={(e) => setNama_penyewa(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          required
                          placeholder="Nama pengontrak"
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">
                          Nomer kontrakan
                        </label>
                        <select
                          value={no_kontrakan}
                          onChange={(e) => setNo_kontrakan(e.target.value)}
                          className="form-control"
                          required
                        >
                          {/* <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option> */}

                          <option label="Pilih" disabled selected></option>
                          {Kontrakans.map((kontrakan) => (
                            <option value={kontrakan.no_kontrakan}>
                              {kontrakan.no_kontrakan}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-12 text-danger">{msg}</div>

                      <div className="col-md-1">
                        <Link to="/manage-user" className="btn btn-info">
                          Kembali
                        </Link>
                      </div>
                      {/* {onSubmit={SaveUser} } */}
                      <button
                        // onClick={() => SaveUser()}
                        type="submiit"
                        className="btn btn-purple waves-effect waves-light"
                      >
                        Simpan
                      </button>
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

export default CreateUser;
