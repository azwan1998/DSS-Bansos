
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import SideBar from './components/sidebar/SideBar';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <SideBar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
