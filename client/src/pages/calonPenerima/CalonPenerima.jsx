import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DeleteOutline, InfoOutlined } from "@material-ui/icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fileDownload from "js-file-download";
import Loading from "../../components/loading/Loading";
import Search from "../../components/searching/Searching";

function CalonPenerima() {
  const [CalonPenerima, setCalonPenerima] = useState([]);
  const [daerah, setDaerah] = useState([]);
  const [id_daerahs, setId_daerah] = useState();
  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [detail, setDetail] = useState();



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [loading, setLoading] = useState(false);

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
      console.log(response.data);
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

  const handleDetail = (id) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://127.0.0.1:8000/api/penerima/show/${id}`)
      .then((response) => {
        setDetail(response.data.data);
        handleShow2();
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Proses = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    console.log(id_daerahs);
    await axios
      .post(`http://127.0.0.1:8000/api/penerima/store?id_daerahs=${id_daerahs}`)
      .then((response) => {
        //set response user to state
        // setCalonPenerima(response.data);
        handleClose();
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          // Lakukan tindakan setelah login berhasil
          fetchData();
        }, 3000);
        // console.log(response.data.data);
      }, []);
  };

  const Excel = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`http://127.0.0.1:8000/api/penerima/excel`, { responseType: "blob" })
      .then((response) => {
        //set response user to state
        // setCalonPenerima(response.data);
        fileDownload(response.data, "calonPenerima.xlsx");
        // console.log(response.data.data);
      }, []);
  };

  // console.log(keluarga);
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      history("/login");
    }
    // fetchData();

    getDaerah();


    const Searching = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        //fetch user from Rest API
        await axios
          .get(`http://127.0.0.1:8000/api/penerima/?Searching=${searchTerm}`)
          .then((response) => {
            //set response user to state
            setCalonPenerima(response.data);
            // console.log(response.data);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    Searching();

    //call function "fetchData"
    // fetchData();
    // console.log('ahahahahahaahahah');
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
                <Search handleSearch={handleSearch} />

                </Col>
                <Col></Col>
                <Col md="end">
                  <Button variant="primary" onClick={handleShow}>
                    Silahkan Proses Data
                  </Button>{" "}
                  <Button variant="secondary" onClick={Excel}>
                    Silahkan Export Excel
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
                    <th>Nilai</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <div>
                      <Loading />
                    </div>
                  ) : (
                    CalonPenerima.map((test, index) => (
                      <tr key={test.id}>
                        <td>{index+1}</td>
                        <td>{test.nama}</td>
                        <td>{test.NIK}</td>
                        <td>{test.kecamatan}</td>
                        <td>{test.nilai}</td>
                        <td>
                          <Button
                            variant="outline-info"
                            onClick={() => handleDetail(test.id)}
                          >
                            <InfoOutlined />
                          </Button>{" "}
                        </td>
                      </tr>
                    ))
                  )}
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
                        <option>Silahkan Pilih Daerah Yang Ingin di Proses</option>
                        <option value={"null"}>Semua Daerah</option>
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
              {/* <>
                <Modal show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Show Detail calon penerima</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama</Form.Label>
                        <Form.Control
                          disabled
                          // value={detail.nama}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>NIK</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.NIK}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Daerah</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.nama_daerah}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.alamat}
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
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Jenis Kelamin</Form.Label>
                        <Form.Control
                          disabled
                          value={detail.jenis_kelamin}
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
              </> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CalonPenerima;
