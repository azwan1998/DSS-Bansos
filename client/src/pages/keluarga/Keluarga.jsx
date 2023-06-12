import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { DeleteOutline, EditOutlined, InfoOutlined } from "@material-ui/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fileDownload from "js-file-download";
import Search from "../../components/searching/Searching";
// import Loading from "../../components/loading/Loading";

function Keluarga({ index, item }) {
  //
  const [keluarga, setKeluarga] = useState([]);
  const [daerah, setDaerah] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(false);

  const [nama, setNama] = useState("");
  const [NIK, setNIK] = useState("");
  const [tanggal_lahir, setTanggal_lahir] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [id_daerahs, setId_daerah] = useState("");
  // const [bobot, setBobot] = useState([]);
  const [formData, setFormData] = useState([]);

  //
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //token
  const token = localStorage.getItem("token");
  const [payload, setPayload] = useState([]);

  // const [perId, setPerId] = useState("");

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    

    

    formData.append("nama", nama);
    formData.append("NIK", NIK);
    formData.append("tanggal_lahir", tanggal_lahir);
    formData.append("jenis_kelamin", jenis_kelamin);
    formData.append("id_daerahs", id_daerahs);
    formData.append("alamat", alamat);

    await axios
      .post("http://127.0.0.1:8000/api/kepala/store", formData)
      .then((response) => {
        // console.log(response.data)

        // fetchData();
        // getId();
        handlePerfect(response.data.id);

        // console.log(bobot);
      });
    // .catch((error) => {
    //   //assign error to state "validation"
    //   setValidation(error.response.data.errors);
    //   // console.log(error.response.data);
    // });
  };

  // const getId = () => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   axios.get("http://127.0.0.1:8000/api/kepala/getId").then((response) => {
  //     setPerId(response.data.id);

      
  //   });
  // };

  const handleChange = (e, index) => {
    const updatedData = [...formData];
    updatedData[index] = {
      ...updatedData[index],
      value: e.target.value,
    };
    setFormData(updatedData);
  };

  const handlePerfect = async (perId) => {

    // await getId();
    console.log(perId);
    // Mengirim data ke API menggunakan metode POST
    const data = formData.map((data) => data.value);
    setPayload(data);

    
    // console.log(data);

    const transformedPayload = {
      "bobot": payload
    };

    // console.log(transformedPayload);
    // const entah = perId + 1;

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .post(`http://127.0.0.1:8000/api/kepala/storeUpdate/${perId}`, transformedPayload,{
        headers: {
          'Content-Type': 'application/json',
          // Tambahkan header lain jika diperlukan
        }
      })
      .then((response) => {
        // setPerId(null);
        console.log(response.data); // Output dari API
      })
      .catch((error) => {
        // setPerId(null);
        console.error("Error:", error);
      });
      
    // setPayload(null);
    fetchData();
  };
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

  const handleExcel = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    console.log(id_daerahs);
    await axios
      .get(`http://127.0.0.1:8000/api/kepala/excel?id_daerahs=${id_daerahs}`, {
        responseType: "blob",
      })
      .then((response) => {
        //set response user to state
        // setCalonPenerima(response.data);
        fileDownload(response.data, "KepalaKeluarga.xlsx");
        // console.log(response.data.data);
      }, []);
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
    await axios
      .get("http://127.0.0.1:8000/api/kriteria?list=true")
      .then((response) => {
        //set response user to state
        setKriteria(response.data);
        // console.log(response.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .post(`http://127.0.0.1:8000/api/kepala/delete/${id}`)
      .then(() => {
        setKeluarga(keluarga.filter((row) => row.id !== id));
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }

    dataDaerah();

    Kriteria();

    const Searching = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //fetch user from Rest API
        await axios
          .get(`http://127.0.0.1:8000/api/kepala/?Searching=${searchTerm}`)
          .then((response) => {
            //set response user to state
            setKeluarga(response.data);
            // console.log(response.data);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    Searching();

    //call function "fetchData"
    // fetchData();

    //call datadaerah
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
                  <Search handleSearch={handleSearch} />
                </Col>
                <Col></Col>
                <Col md="end">
                  <Button variant="primary" onClick={handleShow}>
                    Input Data Keluarga
                  </Button>{" "}
                  <Button variant="secondary" onClick={handleShow1}>
                    Export Excel
                  </Button>
                </Col>
              </Row>
              <br />
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIK</th>
                    <th>Daerah</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {keluarga.map((test, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
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
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Input Data Keluarga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      // className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder="masukkan nama"
                        autoFocus
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>NIK</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        placeholder="masukkan NIK"
                        autoFocus
                        onChange={(e) => setNIK(e.target.value)}
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
                        placeholder="masukkan tanggal lahir"
                        autoFocus
                        onChange={(e) => setTanggal_lahir(e.target.value)}
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
                        onChange={(e) => setJenis_kelamin(e.target.value)}
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
                        onChange={(e) => setId_daerah(e.target.value)}
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
                      <Form.Control
                        as="textarea"
                        rows={2}
                        onChange={(e) => setAlamat(e.target.value)}
                      />
                    </Form.Group>
                    {kriteria.map((data, index) => (
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                        key={index}
                      >
                        <Form.Label>{data.nama}</Form.Label>
                        {data.list === "0" ? (
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="masukkan nilai"
                            autoFocus
                            onChange={(e) => handleChange(e, index)}
                            // onChange={handleChange}
                          />
                        ) : (
                          <Form.Select
                            aria-label="Default select example"
                            size="lg"
                            onChange={(e) => handleChange(e, index)}
                            // onChange={handleChange}
                          >
                            <option>
                              - - - - - - - - - - - - - - - SILAHKAN PILIH - - -
                              - - - - - - - - - - - -
                            </option>
                            {data.subKriteria.map((jj) => (
                              <option value={jj.nilai}>{jj.nama}</option>
                            ))}
                          </Form.Select>
                        )}
                      </Form.Group>
                    ))}
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
              <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                  <Modal.Title>Filter Proses Data Keluarga</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleClose1}>
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
                        <option value={"null"}>Semua Daerah</option>
                        {daerah.map((gg) => (
                          <option value={gg.id}>{gg.nama_daerah}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose1}>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" onClick={handleExcel}>
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
