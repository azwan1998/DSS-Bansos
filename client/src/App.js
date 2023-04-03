
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import Dashboard from './pages/dashboard/Dashboard';
import Keluarga from './pages/keluarga/Keluarga';
import CalonPenerima from './pages/calonPenerima/CalonPenerima';
import Daerah from './pages/daerah/Daerah';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Kriteria from './pages/kriteria/Kriteria';
import SubKriteria from './pages/subkriteria/SubKriteria';
import Login from './pages/login/Login';
import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function App(id) {
  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="Wrapper">
      <Router>
        <Routes>
          <Route exact path='/login'
            element={
                <Login />
            }
          />
          <Route path='/'
            element={
              <>
                <Header />
                <Dashboard />
                <SideBar />
              </>
            }
          />
          <Route path='/family'
            element={
              <>
                <Header />
                <Keluarga />
                <SideBar />
              </>
            }
          />
          <Route path='/calon'
            element={
              <>
                <Header />
                <CalonPenerima />
                <SideBar />
              </>
            }
          />
          <Route path='/daerah'
            element={
              <>
                <Header />
                <Daerah />
                <SideBar />
              </>
            }
          />
          <Route path='/kriteria'
            element={
              <>
                <Header />
                <Kriteria />
                <SideBar />
              </>
            }
          />
          <Route path='/subkriteria'
            element={
              <>
                <Header />
                <SubKriteria />
                <SideBar />
              </>
            }
          />
        </Routes>
        <>
          <Footer />
        </>
      </Router>
    </div>
  );
}

export default App;
