import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Segoe UI', margin: 0, padding: 0, backgroundColor: '#f8f9fa', color: '#333' }}>
      
      {/* হিরো সেকশন */}
      <div style={{ backgroundColor: '#212529', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '38px', margin: '0 0 15px 0', color: '#ff5722' }}>Khalo India POS</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: 'auto', color: '#bbb', lineHeight: '1.5' }}>
          Smart SaaS Restaurant Management & Digital Ordering System built for modern restaurants.
        </p>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <Link to="/restaurant" style={{ backgroundColor: '#ff5722', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            Restaurant Login
          </Link>
          <Link to="/admin" style={{ backgroundColor: '#495057', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            Admin Portal
          </Link>
        </div>
      </div>

      {/* ফিচার সেকশন */}
      <div style={{ padding: '50px 20px', maxWidth: '900px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px' }}>Core Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#ff5722', marginTop: 0 }}>Real-Time Kitchen Orders</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Instant WebSocket connection sends customer orders straight to the kitchen Kanban board with audio alerts.</p>
          </div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#ff5722', marginTop: 0 }}>Table QR Code Ordering</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Generate unique table QR codes instantly so customers can browse the digital menu and order seamlessly.</p>
          </div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#ff5722', marginTop: 0 }}>Stock & Inventory Toggle</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Easily toggle items out of stock from the cashier panel to instantly update the live customer menu.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
