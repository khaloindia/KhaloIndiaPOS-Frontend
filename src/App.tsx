import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RestaurantPanel from './pages/RestaurantPanel';
import CustomerMenu from './pages/CustomerMenu';
import SuperAdmin from './pages/SuperAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant" element={<RestaurantPanel />} />
        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/admin" element={<SuperAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
