import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// আপাতত পেজগুলোর স্ট্রাকচার বানাচ্ছি, পরে আলাদা ফোল্ডারে সরাব
const LandingPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Khalo India Main Website</h2>
    <p>This will be designed later.</p>
  </div>
);

const RestaurantLogin = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Restaurant Login Panel</h2>
    <p>Admin login interface goes here.</p>
  </div>
);

const CashierDashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h2>Live Cashier Dashboard</h2>
    <p>WebSockets will be connected here.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant" element={<RestaurantLogin />} />
        <Route path="/cashier" element={<CashierDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

