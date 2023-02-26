
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';
import Dashboard from './pages/dashboard/Dashboard';
import Keluarga from './pages/keluarga/Keluarga';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
        </Routes>
        <>
          <Footer />
        </>
      </Router>
    </div>
  );
}

export default App;
