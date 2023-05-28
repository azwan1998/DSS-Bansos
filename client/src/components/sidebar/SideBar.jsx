import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SideBar() {
  const history = useNavigate();

  const logoutHanlder = async () => {
    Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil API untuk melakukan logout
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        axios
          .post("http://localhost:8000/api/auth/logout", token)
          .then((response) => {
            if ((response, 200)) {
              // Logout berhasil
              localStorage.removeItem("token", token);
              // Swal.fire('Berhasil!', 'Anda berhasil keluar.', 'success');
              history('/login')
            } else {
              // Logout gagal
              Swal.fire(
                "Gagal",
                "Terjadi kesalahan saat melakukan logout.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error(error);
            // Logout gagal karena terjadi kesalahan
            Swal.fire(
              "Gagal",
              "Terjadi kesalahan saat melakukan logout.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Batal logout
        Swal.fire("Batal", "Logout dibatalkan.", "info");
      }
    });
  };
  return (
    
    <div className="sidebarMenu">
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="../../index3.html" className="brand-link">
          <img
            src="../../dist/img/log.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ height: "200px" }}
          />
          <span className="brand-text font-weight-light ">DSS-Bansos-PKB</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}
          {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
                <a href="" className="d-block">Administrator</a>
            </div>
            </div> */}
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="nav-icon fas fa-light fa-house" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/family" className="nav-link">
                  <i className="nav-icon fas fa-light fa-users" />
                  <p>Data Kepala Keluarga</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-light fa-list-check" />
                  <p>
                    Data Kriteria
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/kriteria" className="nav-link">
                      <i className="fas fa-light fa-check nav-icon" />
                      <p>Kriteria</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/subkriteria" className="nav-link">
                      <i className="fas fa-light fa-check nav-icon" />
                      <p>Subkriteria</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="/daerah" className="nav-link">
                  <i className="nav-icon fas fa-light fa-map-location-dot" />
                  <p>Data Daerah</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/calon" className="nav-link">
                  <i className="nav-icon fas fa-light fa-user-check" />
                  <p>Calon Penerima</p>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={logoutHanlder} href="#" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
}

export default SideBar;
