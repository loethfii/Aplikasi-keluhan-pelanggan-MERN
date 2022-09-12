import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./Topclass.js/Topnav";

const UserNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <header id="topnav">
        <Topnav />

        <div class="navbar-custom">
          <div class="container">
            <div id="navigation">
              {/* Navigation Menu*/}
              <ul class="navigation-menu">
                <li class="active">
                  <a href="/user">
                    <i class="md md-home"></i> <span> Dashboard </span>
                  </a>
                </li>
                <li class="has-submenu">
                  <a href="/user/pengajuan-komplain">
                    <i class="md md-quick-contacts-mail"></i>
                    <span> Pengajuan Keluhan </span>
                  </a>
                </li>
              </ul>
              {/* End navigation menu  */}
            </div>
          </div>
        </div>
      </header>
      {/*  */}
      {/* End Navigation Bar*/}
    </>
  );
};

export default UserNavbar;
