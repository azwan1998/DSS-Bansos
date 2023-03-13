import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState([]);
    // const [name, setName] = useState({});

    //define history
    const history = useNavigate();

    //token
    const token = localStorage.getItem("token");
    // console.log(token);
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/auth/me')
        .then((response) => {

            //set response user to state
            setUser(response.data.data);
            // console.log(response.data.data);
        })
    }
    useEffect(() => {

        //check token empty
        if(!token) {

            //redirect login page
            history('/login');
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
                <h1>Dashboard</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Dashboard</h3>
            </div>
            <div className="card-body">
            {user.name}
            </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default Dashboard