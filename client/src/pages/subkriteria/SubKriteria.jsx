import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate,Link, useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DeleteOutline,EditOutlined, InfoOutlined } from '@material-ui/icons';

function SubKriteria() {
    const [subKriteria, setSubKriteria] = useState([]);
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [kriteria, setKriteria] = useState("");
    const [nama, setNama] = useState("")
    const [nilai, setNilai] = useState("");
    const [validation, setValidation] = useState([]);
    const [id,setId]  = useSearchParams(0);
    const [list, setList] = useState([]);
    id.get("id");
    const param = id.get("id");
    // console.log(param);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
  
    const handleSubmit = async (e) => {
  
      e.preventDefault();
  
      const formData = new FormData();
  
      formData.append("id_kriterias", kriteria);
      formData.append("nama", nama);
      formData.append("nilai", nilai);
  
      await axios
        .post("http://127.0.0.1:8000/api/subkriteria/store", formData)
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

    const List = async () => {
      axios.get(`http://127.0.0.1:8000/api/kriteria/`).then((response) => {
        //set response user to state
        setList(response.data.data.data);
        console.log(response.data.data.data);
      });
    }
  
    const ShowSubKriteria = async () =>{
      
      axios.get(`http://127.0.0.1:8000/api/subkriteria/show/${param}`).then((response) => {
        //set response user to state
        setKriteria(response.data.data.nama_kriteria);
        setNama(response.data.data.nama);
        setNilai(response.data.data.nilai);
        // console.log(response.data.data.data);
      });
      await handleShow1();
    };
  
    const HandleDelete = async () =>{
  
      await axios.post(`http://127.0.0.1:8000/api/subkriteria/delete/${param}`).then((response) => {
        fetchData();
        // console.log(response.data.data.data);
      });
    }
  
    const ShowSubKriteria1 = async () =>{
  
      await axios.get(`http://127.0.0.1:8000/api/subkriteria/show/${param}`).then((response) => {
        //set response user to state
        setKriteria(response.data.data.id_kriterias);
        setNama(response.data.data.nama);
        setNilai(response.data.data.nilai);
        handleShow2();
        // console.log(response.data.data.data);
      });
    };
    const handleEdit = async (e) => {
  
      e.preventDefault();
      const formData = new FormData();
  
      formData.append("id_kriterias", kriteria);
      formData.append("nama", nama);
      formData.append("nilai", nilai);
  
      await axios
        .post(`http://127.0.0.1:8000/api/subkriteria/update/${param}`, formData)
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
      await axios.get("http://127.0.0.1:8000/api/subkriteria/").then((response) => {
        //set response user to state
        setSubKriteria(response.data.data.data);
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

      //call list
      List();
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
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Data SubKriteria</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            {/* Default box */}
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Data SubKriteria</h3>
            </div>
            <div className="card-body">
                {/* desai nya belom ini */}
              {/* modal input data */}
              <>
                <Button variant="primary" onClick={handleShow}>
                  Input Data SubKriteria
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
                        <Form.Label>Kriteria</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          size="lg"
                          value={kriteria}
                          onChange={(e) => setKriteria(e.target.value)}
                        >
                          {list.map((test) => (
                            <>
                              <option value={test.id}>{test.nama_kriteria}</option>
                            </>
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
                        <Form.Label>Nilai SubKriteria</Form.Label>
                        <Form.Control 
                        type="number" 
                        placeholder="5" 
                        autoFocus
                        value={nilai}
                        onChange={(e) => setNilai(e.target.value)} 
                        />
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
                        <Form.Label>Kriteria</Form.Label>
                        <br />
                        <Form.Select
                          aria-label="Default select example"
                          size="lg"
                          value={kriteria}
                          onChange={(e) => setKriteria(e.target.value)}
                        >
                          {list.map((test) => (
                            <>
                              <option value={test.id}>{test.nama_kriteria}</option>
                            </>
                          ))}
                        </Form.Select>
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
                          value={kriteria}
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
                        value={nilai}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={ShowSubKriteria}>
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama SubKriteria</th>
                    <th>Nama Kriteria</th>
                    <th>Nilai SubKriteria</th>
                    <th>Code Kriteria</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subKriteria.map((test, index) => (
                    <tr key={test.id}>
                      <td>{test.id}</td>
                      <td>{test.nama}</td>
                      <td>{test.nama_kriteria}</td>
                      <td>{test.nilai}</td>
                      <td>{test.code}</td>
                      <td>
                        <Button variant="outline-warning" as={Link} to={`/subkriteria?id=${test.id}`} onClick={ShowSubKriteria}><EditOutlined /></Button>{' '}
                        <Button variant="outline-info" as={Link} to={`/subkriteria?id=${test.id}`} onClick={ShowSubKriteria1}><InfoOutlined /></Button>{' '}
                        <Button variant="outline-danger" as={Link} to={`/subkriteria?id=${test.id}`} onClick={HandleDelete}><DeleteOutline /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Nama SubKriteria</th>
                    <th>Nama Kriteria</th>
                    <th>Nilai SubKriteria</th>
                    <th>Code</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default SubKriteria