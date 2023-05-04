import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutline,
  EditOutlined,
  InfoOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import Stack from "react-bootstrap/Stack";
import { Container } from "@material-ui/core";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Keluarga({ index, item }) {
  const [keluarga, setKeluarga] = useState([]);
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
    await axios.get("http://127.0.0.1:8000/api/kepala/").then((response) => {
      //set response user to state
      setKeluarga(response.data);
      // console.log(response.data);
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
                    Input Data Keluarga
                  </Button>{" "}
                  <Button variant="secondary">Export Excel</Button>
                </Col>
              </Row>
              <br />
              {/* <Stack direction="horizontal" gap={3}>
              <Form.Control className="me-auto" placeholder="Add your item here..." />
              <Button variant="secondary">Submit</Button>
              <div className="vr" />
              <Button variant="outline-danger">Reset</Button>
            </Stack> */}
              {/* <div className="grap-2 d-md-flex justify-content-md-end mb-3">
                <button type="button" className="btn btn-primary">
                  Input Data
                </button>
                <button type="button" className="btn btn-secondary">
                  Cetak Excel
                </button>
              </div> */}
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
                  {keluarga.map((test, index) => (
                    <tr key={index}>
                      <td>{test.id}</td>
                      <td>{test.nama}</td>
                      <td>{test.NIK}</td>
                      <td>{test.daerah}</td>
                      <td>
                        <Button variant="outline-warning">
                          <EditOutlined />
                        </Button>{" "}
                        <Button variant="outline-info">
                          <InfoOutlined />
                        </Button>{" "}
                        <Button variant="outline-danger">
                          <DeleteOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Input Data Kriteria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleClose}>
                    <Row>
                      <Col>
                        <Form.Group
                          // className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Nama</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="kUrnial"
                            autoFocus
                            // value={code}
                            // onChange={(e) => setCode(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>NIK</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="017284278428"
                            autoFocus
                            // value={nama}
                            // onChange={(e) => setNama(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Tanggal Lahir</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="10-10-2000"
                            autoFocus
                            // value={bobot}
                            // onChange={(e) => setBobot(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Jenis Kelamin</Form.Label>
                          <Form.Select
                            aria-label="Default select example"
                            size="Lg"
                            // value={atribut}
                            // onChange={(e) => setAtribut(e.target.value)}
                          >
                            <option>. . . . . SILAHKAN PILIH . . . . .</option>
                            <option value="BENEFIT">Laki - Laki</option>
                            <option value="COST">Perempuan</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Atirbut</Form.Label>
                      <br />
                      <Form.Select
                        aria-label="Default select example"
                        size="lg"
                        // value={atribut}
                        // onChange={(e) => setAtribut(e.target.value)}
                      >
                        <option>Select Atribut Kriteria</option>
                        <option value="BENEFIT">BENEFIT</option>
                        <option value="COST">COST</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleClose}>
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

export default Keluarga;
