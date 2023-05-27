import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  DeleteOutline,
  InfoOutlined,
} from "@material-ui/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fileDownload from 'js-file-download';

function CalonPenerima() {
  const [CalonPenerima, setCalonPenerima] = useState([]);
  const [daerah, setDaerah] = useState([]);
  const [id_daerahs,setId_daerah] = useState();
  const history = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //token
  const token = localStorage.getItem("token");
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/penerima").then((response) => {
      //set response user to state
      setCalonPenerima(response.data);
      // console.log(response.data.data);
    });
  };

  const getDaerah = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/daerah").then((response) => {
      //set response user to state
      setDaerah(response.data.data);
        // console.log(response.data.data);
    });
  };

  const Proses = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    console.log(id_daerahs);
    await axios.post(`http://127.0.0.1:8000/api/penerima/store?id_daerahs=${id_daerahs}`).then((response) => {
      //set response user to state
      // setCalonPenerima(response.data);
      handleClose();
      fetchData();
        // console.log(response.data.data);
    },[]);
  };

  const Excel = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get(`http://127.0.0.1:8000/api/penerima/excel`,{responseType: 'blob',}).then((response) => {
      //set response user to state
      // setCalonPenerima(response.data);
      fileDownload(response.data, 'calonPenerima.xlsx');
        // console.log(response.data.data);
    },[]);
  };

  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    getDaerah();

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
                <h1>Calon Penerima</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Calon Penerima</li>
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
            {/* <div className="card-header">
              <h3 className="card-title">Data Kriteria</h3>
            </div> */}
            <div className="card-body">
              {/* desai nya belom ini */}
              {/* modal input data */}
              <Row>
                <Col>
                  <Form.Control
                    className="me-auto"
                    placeholder="Searching. . . . "
                  />
                </Col>
                <Col></Col>
                <Col md="end">
                  <Button variant="primary" onClick={handleShow}>
                    Silahkan Proses Data
                  </Button>{" "}
                  <Button variant="secondary" onClick={Excel}>Silahkan Export Excel</Button>
                </Col>
              </Row>
              <br />
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Nama Kriteria</th>
                    <th>Bobot</th>
                    <th>Nilai</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CalonPenerima.map((test, index) => (
                    <tr key={test.id}>
                      <td>{test.id}</td>
                      <td>{test.nama}</td>
                      <td>{test.NIK}</td>
                      <td>{test.kecamatan}</td>
                      <td>{test.nilai}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          as={Link}
                          to={`/kriteria?id=${test.id}`}
                          // onClick={fetchData}
                        >
                          <InfoOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          as={Link}
                          to={`/kriteria?id=${test.id}`}
                          // onClick={fetchData}
                        >
                          <DeleteOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Filter Proses Data Penerima</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleClose}>
                  <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Daerah</Form.Label>
                      <br />
                      <Form.Select
                        aria-label="Default select example"
                        size="lg"
                        onChange={(e) => setId_daerah(e.target.value)}
                      >
                        <option value={'null'}>
                          Semua Daerah
                        </option>
                        {daerah.map((gg) => (
                          <option value={gg.id}>{gg.nama_daerah}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>           
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={Proses}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CalonPenerima;
