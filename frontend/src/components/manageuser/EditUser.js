import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import ManageUserNavbar from "../navbar/ManageUserNavbar";

const EditUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [nama_penyewa, setNama_penyewa] = useState("");
  const [role, setRole] = useState("");
  const [no_kontrakan, setNo_kontrakan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getUserById();
  }, []);
  const token = localStorage.getItem("token");
  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    setEmail(response.data.email);
    setPasword(response.data.password);
    setNama_penyewa(response.data.nama_penyewa);
    setRole(response.data.role);
    setNo_kontrakan(response.data.no_kontrakan);
  };

  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/user/${id}`,
        {
          email,
          password,
          nama_penyewa,
          role,
          no_kontrakan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/manage-user");
    } catch (error) {
      console.log(error);
    }
  };

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
                    <h3 className="panel-title">Edit data user pengontrak</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={UpdateUser} action="/manage-user">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
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
                        >
                          {/* <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option> */}

                          {Kontrakans.map((kontrakan) => (
                            <option value={kontrakan.no_kontrakan}>
                              {kontrakan.no_kontrakan}
                            </option>
                          ))}
                        </select>
                        {/* <input
                        type="text"
                        value={no_kontrakan}
                        onChange={(e) => setNo_kontrakan(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Nomer kontrakan"
                      /> */}
                      </div>
                      <div className="col-md-1">
                        <Link to="/manage-user" className="btn btn-info">
                          Kembali
                        </Link>
                      </div>
                      <button
                        type="submit"
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

export default EditUser;
