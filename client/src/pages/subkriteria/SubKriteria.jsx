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

function SubKriteria() {
  const [subKriteria, setSubKriteria] = useState([]);
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [kriteria, setKriteria] = useState("");
  const [nama, setNama] = useState("");
  const [nilai, setNilai] = useState("");

  const [detail, setDetail] = useState([]);

  const [validation, setValidation] = useState([]);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const token = localStorage.getItem("token");

  // console.log(param);

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

        formData.append("id_kriterias", kriteria);
        formData.append("nama", nama);
        formData.append("nilai", nilai);

        axios
          .post("http://127.0.0.1:8000/api/subkriteria/store", formData)
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
  };
  

  const List = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://127.0.0.1:8000/api/kriteria/?list=true`)
      .then((response) => {
        //set response user to state
        setList(response.data);
        // console.log(response.data);
      });
  };

  const ShowSubKriteria = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://127.0.0.1:8000/api/subkriteria/show/${id}`)
      .then((response) => {
        //set response user to state
        setKriteria(response.data.data.nama_kriteria);
        setNama(response.data.data.nama);
        setNilai(response.data.data.nilai);
        setIdEdit(id);
        handleShow1();
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
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .post(`http://127.0.0.1:8000/api/subkriteria/delete/${id}`)
          .then((response) => {
            if ((response, 201)) {
              setSubKriteria(subKriteria.filter((row) => row.id !== id));
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

  const ShowSubKriteria1 = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://127.0.0.1:8000/api/subkriteria/show/${id}`)
      .then((response) => {
        //set response user to state
        setDetail(response.data.data);
        handleShow2();
        // console.log(response.data.data.data);
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

        const formData = new FormData();

        formData.append("id_kriterias", kriteria);
        formData.append("nama", nama);
        formData.append("nilai", nilai);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        axios
          .post(
            `http://127.0.0.1:8000/api/subkriteria/update/${idEdit}`,
            formData
          )
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
  
  // console.log(token);
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get("http://127.0.0.1:8000/api/subkriteria/")
      .then((response) => {
        //set response user to state
        setSubKriteria(response.data);
      });
  };
  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    // fetchData();

    const Searching = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //fetch user from Rest API
        await axios
          .get(`http://127.0.0.1:8000/api/subkriteria/?Searching=${searchTerm}`)
          .then((response) => {
            //set response user to state
            setSubKriteria(response.data);
            // console.log(response.data);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    Searching();
    //call function "fetchData"

    //call list
    List();
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
                <h1>Data SubKriteria</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Data SubKriteria</li>
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
              <>
                <Row>
                  <Col>
                    <Search handleSearch={handleSearch} />
                  </Col>
                  <Col></Col>
                  <Col md="end">
                    <Button variant="primary" onClick={handleShow}>
                      Input Data SubKriteria
                    </Button>
                  </Col>
                </Row>
                <br />
                <br />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Input Data SubKriteria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          size="lg"
                          // value={kriteria}
                          onChange={(e) => setKriteria(e.target.value)}
                        >
                          <option>
                            - - - - - - - - - - - - - - - SILAHKAN PILIH - - - -
                            - - - - - - - - - - -
                          </option>
                          {list.map((gg) => (
                            <option value={gg.id}>{gg.nama}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama SubKriteria</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="masukkan subkriteria"
                          autoFocus
                          // value={nama}
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nilai SubKriteria</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="masukkan nilai"
                          autoFocus
                          // value={nilai}
                          onChange={(e) => setNilai(e.target.value)}
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
                    <Modal.Title>Edit Data SubKriteria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleEdit}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          size="lg"
                          value={kriteria}
                          onChange={(e) => setKriteria(e.target.value)}
                        >
                          <option>
                            - - - - - - - - - - - - - - - SILAHKAN PILIH - - - -
                            - - - - - - - - - - -
                          </option>
                          {list.map((gg) => (
                            <option value={gg.id}>{gg.nama}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama SubKriteria</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          value={nama}
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
                          autoFocus
                          value={nilai}
                          onChange={(e) => setNilai(e.target.value)}
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
                      onClick={() => handleEdit(idEdit)}
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
                    <Modal.Title>Show Data SubKriteria</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Code Kriteria</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.code}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.nama_kriteria}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama SubKriteria</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.nama}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nilai</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.nilai}
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
                    <th>No</th>
                    <th>Nama SubKriteria</th>
                    <th>Nama Kriteria</th>
                    <th>Nilai SubKriteria</th>
                    <th>Atribut Kriteria</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subKriteria.map((test, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{test.nama}</td>
                      <td>{test.nama_kriteria}</td>
                      <td>{test.nilai}</td>
                      <td>{test.atribut}</td>
                      <td>
                        <Button
                          variant="outline-warning"
                          onClick={() => ShowSubKriteria(test.id)}
                        >
                          <EditOutlined />
                        </Button>{" "}
                        <Button
                          variant="outline-info"
                          onClick={() => ShowSubKriteria1(test.id)}
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

export default SubKriteria;
