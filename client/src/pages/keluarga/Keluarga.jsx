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
  const [daerah, setDaerah] = useState([]);
  const [kriteria, setKriteria] = useState([]);
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

  const dataDaerah = async () => {

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/daerah/").then((response) => {
      //set response user to state
      setDaerah(response.data.data);
      // console.log(response.data.data);
    });
  };

  const Kriteria = async () => {

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/kriteria?list=true").then((response) => {
      //set response user to state
      setKriteria(response.data);
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

    //call datadaerah
    dataDaerah();

    Kriteria();
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
                  <Modal.Title>Input Data Keluarga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleClose}>
                    <Form.Group
                      // className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="kurnial"
                        autoFocus
                        // value={code}
                        // onChange={(e) => setCode(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="017284278428"
                        autoFocus
                        // value={nama}
                        // onChange={(e) => setNama(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        placeholder="10-10-2000"
                        autoFocus
                        // value={bobot}
                        // onChange={(e) => setBobot(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <br />
                      <Form.Select
                        aria-label="Default select example"
                        size="Lg"
                        type="text"
                        // value={atribut}
                        // onChange={(e) => setAtribut(e.target.value)}
                      >
                        <option>
                          - - - - - - - - - - - - - - - SILAHKAN PILIH - - - - -
                          - - - - - - - - - -
                        </option>
                        <option value="Laki - Laki">Laki - Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Daerah</Form.Label>
                      <br />
                      <Form.Select
                        aria-label="Default select example"
                        size="lg"
                        // value={atribut}
                        // onChange={(e) => setAtribut(e.target.value)}
                      >
                        <option>
                          - - - - - - - - - - - - - - - SILAHKAN PILIH - - - - -
                          - - - - - - - - - -
                        </option>
                        {daerah.map((gg) => (
                          <option value={gg.id}>{gg.nama_daerah}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control as="textarea" rows={2} />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Jumlah ART</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="5"
                        autoFocus
                        // value={nama}
                        // onChange={(e) => setNama(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>luas Lantai</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="70"
                        autoFocus
                        // value={nama}
                        // onChange={(e) => setNama(e.target.value)}
                      />
                    </Form.Group>

                    {kriteria.map((kk,index) => (
                      <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                      key={index}
                    >
                      <Form.Label>{kk.nama}</Form.Label>
                      <br />
                      <Form.Select
                        aria-label="Default select example"
                        size="lg"
                        // value={atribut}
                        // onChange={(e) => setAtribut(e.target.value)}
                      >
                        <option>
                          - - - - - - - - - - - - - - - SILAHKAN PILIH - - - - -
                          - - - - - - - - - -
                        </option>
                        {kk.subKriteria.map((jj) => (
                          <option value={jj.nilai}>{jj.nama}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    ))}

                    
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
