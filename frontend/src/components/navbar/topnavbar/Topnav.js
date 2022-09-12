import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Topnav = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="topbar-main">
        <div className="container">
          {/* LOGO */}
          <div className="topbar-left">
            <Link className="logo" to="/">
              <i className="fa fa-skyatlas"></i> <span>Keluhan pelanggan </span>
            </Link>
          </div>
          {/* End Logo container*/}

          <div className="menu-extras">
            <ul className="nav navbar-nav navbar-right pull-right">
              <li className="dropdown user-box">
                <a
                  href="#"
                  className="dropdown-toggle waves-effect waves-light profile "
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <img
                    src="/assets/images/users/avatar-1.jpg"
                    alt="user-img"
                    className="img-circle user-img"
                  />
                  <div className="user-status away">
                    <i className="zmdi zmdi-dot-circle"></i>
                  </div>
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <div
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <button
                        style={{
                          width: "100%",
                        }}
                        className="btn "
                        onClick={() => Logout()}
                      >
                        <i className="md md-settings-power"></i> Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="menu-item">
              {/* Mobile menu toggle*/}
              <a className="navbar-toggle">
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
              {/* End mobile menu toggle*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topnav;
