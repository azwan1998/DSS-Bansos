import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DeleteOutline, EditOutlined, InfoOutlined } from "@material-ui/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import Search from "../../components/searching/Searching";

function Daerah() {
  const [daerah, setDaerah] = useState([]);
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [kecamatan, setKecamatan] = useState("");
  const [kecamatan1, setKecamatan1] = useState("");
  const [create, setCreate] = useState("");
  const [update, setUpdate] = useState("");
  const [validation, setValidation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useSearchParams();
  id.get("id");
  const param = id.get("id");
  console.log(param);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleSubmit = async (e) => {
    Swal.fire({
      title: "Konfirmasi Form",
      text: "Apakah Data yang Anda Input sudah Benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil API untuk melakukan logout
        e.preventDefault();

        const formData = new FormData();
    
        formData.append("nama_daerah", kecamatan1);

        axios
        .post("http://127.0.0.1:8000/api/daerah/store", formData)
        .then((response) => {
           if ((response, 201)) {
              fetchData();
            } else {
              // Logout gagal
              Swal.fire(
                "Gagal",
                "Terjadi kesalahan saat melakukan mengiput data.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error(error);
            // Logout gagal karena terjadi kesalahan
            Swal.fire(
              "Gagal",
              "Terjadi kesalahan saat melakukan saat menginput data.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Batal logout
        Swal.fire("Batal", "Input data dibatalkan.", "info");
      }
    });
  };

  const ShowKriteria = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/daerah/show/${param}`)
      .then((response) => {
        //set response user to state
        setKecamatan(response.data.data.nama_daerah);
        setCreate(response.data.data.created_at);
        setUpdate(response.data.data.updated_at);
        handleShow1();
        // console.log(response.data.data.data);
      });
  };

  const HandleDelete = async () => {
    await axios
      .post(`http://127.0.0.1:8000/api/daerah/delete/${param}`)
      .then((response) => {
        fetchData();
        // console.log(response.data.data.data);
      });
  };

  const ShowKriteria1 = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/daerah/show/${param}`)
      .then((response) => {
        //set response user to state
        setKecamatan(response.data.data.nama_daerah);
        setCreate(response.data.data.created_at);
        setUpdate(response.data.data.updated_at);
        handleShow2();
        // console.log(response.data.data.data);
      });
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nama_daerah", kecamatan);

    await axios
      .post(`http://127.0.0.1:8000/api/daerah/update/${param}`, formData)
      .then((response) => {
        setShow1(false);
        //redirect to dashboard
        fetchData();
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data.errors);
        // console.log(error.response.data);
      });
  };

  //token
  const token = localStorage.getItem("token");
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/daerah/").then((response) => {
      //set response user to state
      setDaerah(response.data.data);
      //   console.log(response.data.data);
    });
  };
  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    const Searching = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //fetch user from Rest API
        await axios
          .get(`http://127.0.0.1:8000/api/daerah/?Searching=${searchTerm}`)
          .then((response) => {
            //set response user to state
            setDaerah(response.data.data);
            console.log(response.data.data);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    Searching();

    //call function "fetchData"
    // fetchData();
  }, [searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Data Daerah</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Data Daerah</li>
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
              {/* desai nya belom ini */}
              {/* modal input data */}
              <>
                <Row>
                  <Col>
                    <Search handleSearch={handleSearch} />
                  </Col>
                  <Col></Col>
                  <Col md="end">
                    <Button variant="primary" onClick={handleShow}>
                      Input Data Daerah
                    </Button>
                  </Col>
                </Row>
                <br />
                <br />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Input Data Daerah</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kecamatan</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="C2"
                          autoFocus
                          value={kecamatan1}
                          onChange={(e) => setKecamatan1(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={handleClose && handleSubmit}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              {/* MODAL EDIT DATA */}
              <>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Data Kriteria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleEdit}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kecamatan</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="C2"
                          autoFocus
                          value={kecamatan}
                          onChange={(e) => setKecamatan(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={handleClose1 && handleEdit}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>

              {/* MODAL SHOW DATA */}
              <>
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Show Data Daerah</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kecamatan</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="C2"
                          autoFocus
                          disabled
                          value={kecamatan}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Daerah</th>
                    <th>Updated At</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {daerah.map((test, index) => (
                    <tr key={index.id}>
                      <td>{test.id}</td>
                      <td>{test.nama_daerah}</td>
                      <td>{test.updated_at}</td>
                      <td>{test.created_at}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          as={Link}
                          to={`/daerah?id=${test.id}`}
                          onClick={ShowKriteria}
                        >
                          <EditOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-info"
                          as={Link}
                          to={`/daerah?id=${test.id}`}
                          onClick={ShowKriteria1}
                        >
                          <InfoOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          as={Link}
                          to={`/daerah?id=${test.id}`}
                          onClick={HandleDelete}
                        >
                          <DeleteOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Daerah;
