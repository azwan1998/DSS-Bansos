import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate,Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DeleteOutline,EditOutlined, InfoOutlined } from '@material-ui/icons';


function Kriteria() {
  const [kriteria, setKriteria] = useState([]);
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [code, setCode] = useState("");
  const [nama, setNama] = useState("")
  const [bobot, setBobot] = useState("");
  const [atribut, setAtribut] = useState("");
  const [validation, setValidation] = useState([]);
  const [id,setId]  = useSearchParams();
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

    e.preventDefault();

    const formData = new FormData();

    formData.append("code", code);
    formData.append("nama_kriteria", nama);
    formData.append("bobot_kriteria", bobot);
    formData.append("atribut", atribut);

    await axios
      .post("http://127.0.0.1:8000/api/kriteria/store", formData)
      .then((response) => {
        setShow(false);
        //redirect to dashboard
        fetchData()
      })
      .catch((error) => {
        //assign error to state "validation"
        setValidation(error.response.data.errors);
        // console.log(error.response.data);
      });
  };

  const ShowKriteria = async () =>{

    await axios.get(`http://127.0.0.1:8000/api/kriteria/show/${param}`).then((response) => {
      //set response user to state
      setCode(response.data.data.code);
      setNama(response.data.data.nama_kriteria);
      setBobot(response.data.data.bobot_kriteria);
      setAtribut(response.data.data.atribut);
      handleShow1();
      // console.log(response.data.data.data);
    });
  };

  const HandleDelete = async () =>{

    await axios.post(`http://127.0.0.1:8000/api/kriteria/delete/${param}`).then((response) => {
      fetchData();
      // console.log(response.data.data.data);
    });
  }

  const ShowKriteria1 = async () =>{

    await axios.get(`http://127.0.0.1:8000/api/kriteria/show/${param}`).then((response) => {
      //set response user to state
      setCode(response.data.data.code);
      setNama(response.data.data.nama_kriteria);
      setBobot(response.data.data.bobot_kriteria);
      setAtribut(response.data.data.atribut);
      handleShow2();
      // console.log(response.data.data.data);
    });
  };
  const handleEdit = async (e) => {

    e.preventDefault();
    const formData = new FormData();

    formData.append("code", code);
    formData.append("nama_kriteria", nama);
    formData.append("bobot_kriteria", bobot);
    formData.append("atribut", atribut);

    await axios
      .post(`http://127.0.0.1:8000/api/kriteria/update/${param}`, formData)
      .then((response) => {
        setShow1(false);
        //redirect to dashboard
        fetchData()
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
    await axios.get("http://127.0.0.1:8000/api/kriteria").then((response) => {
      //set response user to state
      setKriteria(response.data.data.data);
      // console.log(response.data.data.data);
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
            <div className="card-header">
              <h3 className="card-title">Data Kriteria</h3>
            </div>
            <div className="card-body">
              {/* desai nya belom ini */}
              {/* modal input data */}
              <>
                <Button variant="primary" onClick={handleShow}>
                  Input Data Kriteria
                </Button>
                <br/>
                <br/> 

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
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="C2"
                          autoFocus
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Jumlah Art"
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
                        placeholder="5" 
                        autoFocus
                        value={bobot}
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
                          value={atribut}
                          onChange={(e) => setAtribut(e.target.value)}
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
                    <Button type="submit" variant="primary" onClick={handleClose && handleSubmit}>
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
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
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
                        value={bobot}
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
                          value={atribut}
                          onChange={(e) => setAtribut(e.target.value)}
                        >
                          <option>Select Atribut Kriteria</option>
                          <option value="BENEFIT">BENEFIT</option>
                          <option value="COST">COST</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleClose1 && handleEdit}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
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
                          type="text"
                          autoFocus
                          disabled
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Nama Kriteria</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          disabled
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
                        disabled
                        value={bobot}
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
                          disabled
                          value={atribut}
                          onChange={(e) => setAtribut(e.target.value)}
                        >
                          <option>Select Atribut Kriteria</option>
                          <option value="BENEFIT">BENEFIT</option>
                          <option value="COST">COST</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={ShowKriteria}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
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
                      <td>{test.id}</td>
                      <td>{test.code}</td>
                      <td>{test.nama_kriteria}</td>
                      <td>{test.bobot_kriteria}</td>
                      <td>{test.atribut}</td>
                      <td>
                        <Button variant="outline-warning" as={Link} to={`/kriteria?id=${test.id}`} onClick={ShowKriteria}><EditOutlined /></Button>{' '}
                        <Button variant="outline-info" as={Link} to={`/kriteria?id=${test.id}`} onClick={ShowKriteria1}><InfoOutlined /></Button>{' '}
                        <Button variant="outline-danger" as={Link} to={`/kriteria?id=${test.id}`} onClick={HandleDelete}><DeleteOutline /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Nama Kriteria</th>
                    <th>Bobot</th>
                    <th>Atribut</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Kriteria;
