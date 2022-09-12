import React from "react";
import { Link } from "react-router-dom";
import Topnav from "./topnavbar/Topnav";

const ManageUserNavbar = () => {
  return (
    <header id="topnav">
      <Topnav />

      <div className="navbar-custom">
        <div className="container">
          <div id="navigation">
            {/* Navigation Menu*/}
            <ul className="navigation-menu">
              <li className="has-submenu">
                <Link to="/">
                  <i className="md md-home"></i> <span> Dashboard </span>{" "}
                </Link>
              </li>
              <li className="has-submenu active">
                <a href="#">
                  <i className="md md-my-library-books"></i>
                  <span> Master </span>
                </a>
                <ul className="submenu">
                  <li className="active">
                    <Link to="/manage-user">Kelola user</Link>
                  </li>
                  <li>
                    <Link to="/manage-kontrakan">Kelola kontrakan</Link>
                  </li>
                  <li>
                    <Link to="/manage-kendala">Kelola Kendala</Link>
                  </li>
                </ul>
              </li>
              <li className="has-submenu">
                <Link to="/pengajuan-komplain">
                  <i className="md md-pages"></i>
                  <span> Pengajuan Keluhan </span>{" "}
                </Link>
              </li>
              <li className="has-submenu">
                <Link to="/laporan-pengeluaran">
                  <i className="md md-attach-money"></i>
                  <span> Laporan pengeluaran</span>{" "}
                </Link>
              </li>
            </ul>
            {/* End navigation menu  */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ManageUserNavbar;
