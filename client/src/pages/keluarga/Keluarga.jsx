import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Keluarga({ index, item }) {
  const [keluarga, setKeluarga] = useState([]);
  const history = useNavigate();

  //token
  const token = localStorage.getItem("token");
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/kepala/").then((response) => {
      //set response user to state
      setKeluarga(response.data.data.data);
      // console.log(response.data.data.data);
    });
  };
  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);
  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Data Keluarga</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Data Keluarga</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-body">
              <div className="grid gap-2 d-md-flex justify-content-md-end mb-3">
                <input type="search" className="d-flex justify-content-start" />
                <button type="button" className="btn btn-primary">
                  Input Data
                </button>
                <button type="button" className="btn btn-secondary">
                  Cetak Excel
                </button>
              </div>

              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>Daerah</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {keluarga.map((test,index) =>
                    <tr key={index}>
                    <td>{test.id}</td>
                    <td>{test.nama}</td>
                    <td>{test.NIK}</td>
                    <td>{test.nama_daerah}</td>
                  </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Daerah</th>
                    <th>NIK</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Keluarga;
