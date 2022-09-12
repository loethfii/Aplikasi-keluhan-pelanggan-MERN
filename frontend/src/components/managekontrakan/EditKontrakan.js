import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import ManageKontrakanNavbar from "../navbar/ManageKontrakanNavbar";

const EditKontrakan = () => {
  const [no_kontrakan, setNo_kontrakan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getKontrakanById();
  }, []);
  const token = localStorage.getItem("token");

  const getKontrakanById = async () => {
    const response = await axios.get(
      `http://localhost:5000/masterkontrakan/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setNo_kontrakan(response.data.no_kontrakan);
  };

  const UpdateKontrakan = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/masterkontrakan/${id}`,
        {
          no_kontrakan,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/manage-kontrakan");
    } catch (error) {
      console.log(error);
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
                    <h3 className="panel-title">Edit Data Kontrakan</h3>
                  </div>
                  <div className="panel-body">
                    <form onSubmit={UpdateKontrakan}>
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
                          placeholder="Nomer kontrakan"
                        />
                      </div>
                      <tr className="row">
                        <td className="col-sm-5">
                          <Link to="/manage-kontrakan" className="btn btn-info">
                            Kembali
                          </Link>
                        </td>
                        <td className="col-sm-6">
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

export default EditKontrakan;
