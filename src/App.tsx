import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantPanel from './pages/RestaurantPanel';
import CustomerMenu from './pages/CustomerMenu';

const LandingPage = () => (
  <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Segoe UI' }}>
    <h1 style={{ color: '#ff5722' }}>Khalo India POS</h1>
    <p>Smart Restaurant Management System</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant" element={<RestaurantPanel />} />
        <Route path="/menu" element={<CustomerMenu />} />
      </Routes>
    </Router>
  );
}

export default App;

