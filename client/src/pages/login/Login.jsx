import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
 
  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //define state validation
  const [validation, setValidation] = useState([]);

  //define history
  const history = useNavigate();

  //function "loginHanlder"
  const loginHandler = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post("http://localhost:8000/api/auth/login", formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);

        //redirect to dashboard
        history("/");
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data.errors);
        // console.log(error.response.data);
      });
  };
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
          <img src="../../dist/img/log.png" className="brand-image " style={{height: '100px'}} /> <br/>
            <a href="#" className="h1">
              <b>DSS <br/></b>
              {/* <h3><b> Pendukung Keputusan</b></h3> */}
              <h6>Bantuan Sosial DPW-PKB Provinsi Riau</h6>
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Silahkan Login </p>
            {/* {validation.message && (
              <div className="alert alert-danger">{validation.message}</div>
            )} */}
            <form onSubmit={loginHandler}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label>{console.log(loginInput.error_list)}</label> */}
                {/* <span>{loginInput.error_list.email}</span> */}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <span>{loginInput.error_list.password}</span> */}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
              <div className="input-group mb-3">
                {/* /.col */}
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </form>
            {/* <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
}

export default Login;
