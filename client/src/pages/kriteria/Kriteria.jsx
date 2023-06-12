import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DeleteOutline, EditOutlined, InfoOutlined } from "@material-ui/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Search from "../../components/searching/Searching";
import Swal from "sweetalert2";

function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [idEdit, setIdEdit] = useState("");

  //input
  const [nama, setNama] = useState("");
  const [bobot, setBobot] = useState("");
  const [atribut, setAtribut] = useState("");
  //edit
  const [nama1, setNama1] = useState("");
  const [bobot1, setBobot1] = useState("");
  const [atribut1, setAtribut1] = useState("");
  //show
  const [detail, setDetail] = useState([]);

  const [validation, setValidation] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleSubmit = async (e) => {
    handleClose();
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

        formData.append("nama_kriteria", nama);
        formData.append("bobot_kriteria", bobot);
        formData.append("atribut", atribut);

        axios
          .post("http://127.0.0.1:8000/api/kriteria/store", formData)
          .then((response) => {
            if ((response, 200)) {
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

    // await axios
    //   .post("http://127.0.0.1:8000/api/kriteria/store", formData)
    //   .then((response) => {
    //     setShow(false);
    //     //redirect to dashboard
    //     fetchData();
    //   })
    //   .catch((error) => {
    //     //assign error to state "validation"
    //     setValidation(error.response.data.errors);
    //     // console.log(error.response.data);
    //   });
  };

  const ShowKriteria = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://127.0.0.1:8000/api/kriteria/show/${id}`)
      .then((response) => {
        //set response user to state
        setNama1(response.data.data.nama_kriteria);
        setBobot1(response.data.data.bobot_kriteria);
        setAtribut1(response.data.data.atribut);
        handleShow1();
        setIdEdit(id);
        // console.log(response.data.data.data);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Konfirmasi Form",
      text: "Apakah Anda Yakin Menghapus data ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://127.0.0.1:8000/api/kriteria/delete/${id}`)
          .then((response) => {
            if ((response, 201)) {
              setKriteria(kriteria.filter((row) => row.id !== id));
              fetchData();
            } else {
              // Logout gagal
              Swal.fire(
                "Gagal",
                "Terjadi kesalahan saat menghapus data.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error(error);
            // Logout gagal karena terjadi kesalahan
            Swal.fire(
              "Gagal",
              "Terjadi kesalahan saat saat menghapus data.",
              "error"
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Batal logout
        Swal.fire("Batal", "Hapus data dibatalkan.", "info");
      }
    });
  };

  const ShowKriteria1 = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/kriteria/show/${id}`)
      .then((response) => {
        //set response user to state
        setDetail(response.data);
        handleShow2();
        // console.log(response.data);
      });
  };
  const handleEdit = (idEdit) => {
    handleClose1();
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
        // e.preventDefault();

        const formData = new FormData();

        formData.append("nama_kriteria", nama1);
        formData.append("bobot_kriteria", bobot1);
        formData.append("atribut", atribut1);

        axios
          .post(`http://127.0.0.1:8000/api/kriteria/update/${idEdit}`, formData)
          .then((response) => {
            if ((response, 200)) {
              fetchData();
              setIdEdit(null);
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
        setIdEdit(null);
        Swal.fire("Batal", "Input data dibatalkan.", "info");
      }
    });
  };

  //token
  const token = localStorage.getItem("token");
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios.get("http://127.0.0.1:8000/api/kriteria").then((response) => {
      //set response user to state
      setKriteria(response.data);
      // console.log(response.data.data);
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
          .get(`http://127.0.0.1:8000/api/kriteria/?Searching=${searchTerm}`)
          .then((response) => {
            //set response user to state
            setKriteria(response.data);
            // console.log(response.data);
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
                <h1>Data Kriteria</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Kriteria</li>
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
                      Input Data Kriteria
                    </Button>
                  </Col>
                </Row>

                <br />
                <br />
                {/* MODAL SHOW DATA */}
                <>
                  <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Show Data Kriteria</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Code</Form.Label>
                          <Form.Control 
                          disabled 
                          value={detail.code} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Nama Kriteria</Form.Label>
                          <Form.Control 
                          disabled 
                          value={detail.nama} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Bobot Kriteria</Form.Label>
                          <Form.Control 
                          disabled 
                          value={detail.bobot_kriteria} />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Atribut</Form.Label>
                          <Form.Control 
                          disabled 
                          value={detail.atribut} />
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

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Input Data Kriteria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="masukkan nama kriteria"
                          autoFocus
                          // value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Bobot Kriteria</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="masukkan bobot kriteria"
                          autoFocus
                          // value={bobot}
                          onChange={(e) => setBobot(e.target.value)}
                        />
                      </Form.Group>
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
                          onChange={(e) => setAtribut(e.target.value)}
                        >
                          <option>Select Atribut Kriteria</option>
                          <option value="true">BENEFIT</option>
                          <option value="false">COST</option>
                        </Form.Select>
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
                      onClick={handleSubmit}
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
                        <Form.Label>Nama Kriteria</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          value={nama1}
                          onChange={(e) => setNama1(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Bobot Kriteria</Form.Label>
                        <Form.Control
                          type="number"
                          autoFocus
                          value={bobot1}
                          onChange={(e) => setBobot1(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Atirbut</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          size="lg"
                          value={atribut1}
                          onChange={(e) => setAtribut1(e.target.value)}
                        >
                          <option>Select Atribut Kriteria</option>
                          <option value="true">BENEFIT</option>
                          <option value="false">COST</option>
                        </Form.Select>
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
                      onClick={() => handleEdit(idEdit)}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Code</th>
                    <th>Nama Kriteria</th>
                    <th>Bobot</th>
                    <th>Atribut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kriteria.map((test, index) => (
                    <tr key={test.id}>
                      <td>{index + 1}</td>
                      <td>{test.code}</td>
                      <td>{test.nama}</td>
                      <td>{test.bobot_kriteria}</td>
                      <td>{test.atribut}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          onClick={() => ShowKriteria(test.id)}
                        >
                          <EditOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-info"
                          onClick={() => ShowKriteria1(test.id)}
                        >
                          <InfoOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(test.id)}
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

export default Kriteria;
