import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState([]);
  const [kepala, setKepala] = useState();
  const [kriteria, setKriteria] = useState();
  const [daerah, setDaerah] = useState();
  // const [name, setName] = useState({});

  //define history
  const history = useNavigate();

  //token
  const token = localStorage.getItem("token");
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/auth/me").then((response) => {
      //set response user to state
      setUser(response.data.data);
      // console.log(response.data.data);
    });
  };

  const getKepala = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://localhost:8000/api/kepala/count?kepala=true").then((response) => {
      //set response user to state
      setKepala(response.data);
      // console.log(response.data);
    });

    await axios.get("http://localhost:8000/api/kepala/count?daerah=true").then((response) => {
      //set response user to state
      setKriteria(response.data);
      // console.log(response.data);
    });

    await axios.get("http://localhost:8000/api/kepala/count").then((response) => {
      //set response user to state
      setDaerah(response.data);
      // console.log(response.data);
    });
  };
  
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    //call function "fetchData"
    getKepala();
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
                <h1>Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
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
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                      <div className="inner">
                      <h3>{kepala}</h3>
                        <p>Data Kepala Keluarga</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag" />
                      </div>
                      <a href="/family" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>
                        <h3>{kriteria}</h3>
                        </h3>
                        <p>Data Kriteria</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="/kriteria" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>{daerah}</h3>
                        <p>Data Daerah</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add" />
                      </div>
                      <a href="/daerah" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
