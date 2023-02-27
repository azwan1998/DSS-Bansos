
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

function App() {
  return (
    <div className="Wrapper">
      <Router>
        <>
          <Header />
          <SideBar />
        </>
        <Routes>
          <Route exact path='/'
            element={
                <Dashboard />
            }
          />
          <Route path='/family'
            element={
                <Keluarga />
            }
          />
          <Route path='/calon'
            element={
                <CalonPenerima />
            }
          />
          <Route path='/daerah'
            element={
                <Daerah />
            }
          />
          <Route path='/kriteria'
            element={
                <Kriteria />
            }
          />
          <Route path='/subkriteria'
            element={
                <SubKriteria />
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
