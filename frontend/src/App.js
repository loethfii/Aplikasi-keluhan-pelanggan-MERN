import Footer from "./components/footer/Footer";

import Index from "./components/Index";
import LaporanPengeluaran from "./components/laporanpengeluaran/LaporanPengeluaran";

import ManageUser from "./components/manageuser/ManageUser";
import CreateUser from "./components/manageuser/CreateUser";
import EditUser from "./components/manageuser/EditUser";
import ManageKontrakan from "./components/managekontrakan/ManageKontrakan";
import CreateKontrakan from "./components/managekontrakan/CreateKontrakan";
import EditKontrakan from "./components/managekontrakan/EditKontrakan";
import ManageKendala from "./components/managekendala/ManageKendala";
import CreateKendala from "./components/managekendala/CreateKendala";
import EditKendala from "./components/managekendala/EditKendala";
import PengajuanKomplain from "./components/pengajuankomplain/PengajuanKomplain";
import DetailPengajuanKomplain from "./components/pengajuankomplain/DetailPengajuanKomplain";

// user
import IndexPengajuanKomplain from "./components/user/IndexPengajuanKomplain";
import PengajuanKomplainUser from "./components/user/userpengajuankomplain/PengajuanKomplain";
import DetailKomplain from "./components/user/userpengajuankomplain/DetailKomplain";
import TambahPengajuanKomplain from "./components/user/userpengajuankomplain/TambahPengajuanKomplain";
import TambahKomplainLanjutan from "./components/user/userpengajuankomplain/TambahKomplainLanjutan";
import DaftarBlokir from "./components/manageuser/DaftarBlokir";
//login
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const profile = () => {
      axios
        .get(`http://localhost:5000/profile`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const res = response.data;
          setUserProfile(res.data);

          if (res.data.role === "2") {
            const l = [
              "/pengajuan-komplain",
              "/manage-user",
              "/manage-kontrakan",
              "/manage-kendala",
              "/",
              "/laporan-pengeluaran",
            ];
            if (l.includes(location.pathname)) {
              alert("You are not Authorized");
              return window.history.go(-1);
            }
          } else if (res.data.role === "1") {
            const l = ["/user", "/user/pengajuan-komplain"];
            if (l.includes(location.pathname)) {
              alert("You are not Authorized");
              return window.history.go(-1);
            }
          }
        })
        .catch((err) => {
          // alert("not authorized");
          return (window.location.href = "/login");
        });
    };

    if (location.pathname !== "/login") {
      profile();
    } else {
      const c = localStorage.getItem("token");
      if (c != null) {
        return (window.location.href = "/");
      }
    }
  }, [location.pathname]);

  return (
    // <Router>
    <>
      <Routes>
        <Route path="/" element={<Index userProfile={userProfile} />} exact />

        {/* Manage user */}
        <Route path="/manage-user" element={<ManageUser />} />
        <Route path="/manage-user/create" element={<CreateUser />} />
        <Route path="/manage-user/edit/:id" element={<EditUser />} />
        <Route path="/manage-user/daftar-blokir" element={<DaftarBlokir />} />

        {/* Manage kontrakan */}
        <Route path="/manage-kontrakan" element={<ManageKontrakan />} />
        <Route path="/manage-kontrakan/create" element={<CreateKontrakan />} />
        <Route path="/manage-kontrakan/edit/:id" element={<EditKontrakan />} />

        {/* Manage Kendala */}
        <Route path="/manage-kendala" element={<ManageKendala />} />
        <Route path="/manage-kendala/create" element={<CreateKendala />} />
        <Route path="/manage-kendala/edit/:id" element={<EditKendala />} />

        {/* Manage pengaduan komplain */}
        <Route path="/pengajuan-komplain" element={<PengajuanKomplain />} />
        <Route
          path="/pengajuan-komplain/detail/:id"
          element={<DetailPengajuanKomplain />}
        />

        {/* Laporan pengeluaran */}
        <Route path="/laporan-pengeluaran" element={<LaporanPengeluaran />} />

        {/* bagian user */}
        <Route
          path="/user"
          element={<IndexPengajuanKomplain userProfile={userProfile} />}
        />
        <Route
          path="/user/pengajuan-komplain"
          element={<PengajuanKomplainUser />}
        />
        <Route
          path="/user/pengajuan-komplain/detail/:id"
          element={<DetailKomplain />}
        />
        <Route
          path="/user/pengajuan-komplain/create"
          element={<TambahPengajuanKomplain />}
        />
        <Route
          path="/user/pengajuan-komplain/komplain_2/:id"
          element={<TambahKomplainLanjutan />}
        />

        {/* Login user */}
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
    // </Router>
  );
}

export default App;
