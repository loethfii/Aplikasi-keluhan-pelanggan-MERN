import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";

import ManageKontrakanNavbar from "../navbar/ManageKontrakanNavbar";

const CreateKontrakan = () => {
  const [no_kontrakan, setNo_kontrakan] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const SaveKontrakan = async (e) => {
    try {
      await axios.post(
        `http://localhost:5000/masterkontrakan`,
        {
          no_kontrakan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <div>
      <ManageKontrakanNavbar />
      <div className="wrapper">
        <div className="container">
          {/*  */}
          {/* konten */}
          <div className="panel">
            <div className="panel-body">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">Input Data Kontrakan</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={SaveKontrakan} action="/manage-kontrakan">
                      <div className="form-group">
                        <label for="exampleInputPassword1">
                          Nomer Kontrakan
                        </label>
                        <input
                          type="text"
                          value={no_kontrakan}
                          onChange={(e) => setNo_kontrakan(e.target.value)}
                          className="form-control"
                          id="exampleInputPassword1"
                          required
                          placeholder="Nomer kontrakan"
                        />
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-1">
                            <Link
                              to="/manage-kontrakan"
                              className="btn btn-info"
                            >
                              Kembali
                            </Link>
                          </div>
                          <div className="col-md-auto">
                            <button
                              type="submit"
                              className="btn btn-purple waves-effect waves-light"
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
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

export default CreateKontrakan;
