import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");
  const [msg, setMsg] = useState("");
  // const [isEmailValidate, setIsEmailValidate] = useState([]);
  // const [isPasswordValidate, setIsPasswordValidate] = useState([]);

  // const [CekEmailState, SetCekEmailState] = useState("");
  // const [CekPasswordState, SetCekPasswordState] = useState("");
  // const [errorkosong, setError] = useState("");
  const navigate = useNavigate();

  const DoLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.data.token);

      const profile = () => {
        axios
          .get(`http://localhost:5000/profile`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((response) => {
            const res = response.data;
            if (res.data.role === "2") {
              navigate("/user");
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            return (window.location.href = "/login");
          });
      };

      profile();
      // localStorage.setItem(password, password);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div class="wrapper-page">
        <div class="panel panel-color panel-primary panel-pages">
          <div class="panel-heading bg-img">
            <div class="bg-overlay"></div>
            <h3 class="text-center m-t-10 text-white">
              Selamat Datang Pada Aplikasi Keluhan Penyewa Kontrakan Bapak
              Maryono
            </h3>
          </div>

          <div class="panel-body">
            <h4 className="text-center">
              Login dengan Email dan Password anda!
            </h4>
            <form onSubmit={DoLogin} class="form-horizontal m-t-20">
              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control input-lg"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => SetEmail(e.target.value)}
                    placeholder="Masukkan Email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control input-lg"
                    type="password"
                    onChange={(e) => Setpassword(e.target.value)}
                    required
                    placeholder="Masukkan Password"
                  />
                </div>
              </div>
              {/* {!email && !password ? alert("EMail ") : msg} */}
              {msg === null ? (
                <>Hai</>
              ) : msg ? (
                <>
                  <div class="alert alert-danger">{msg}</div>
                </>
              ) : null}

              <div class="form-group text-center m-t-40">
                <div class="col-xs-12">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-lg waves-effect waves-light"
                    // onClick={() => DoLogin()}
                  >
                    LOG IN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
