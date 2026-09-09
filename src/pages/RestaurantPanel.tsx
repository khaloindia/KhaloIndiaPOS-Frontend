import React, { useState, useEffect } from 'react';

export default function RestaurantPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const ws = new WebSocket("wss://khaloindiapos-backend-1.onrender.com/ws/cashier");

    ws.onmessage = (event) => {
      setOrders((prevOrders) => [event.data, ...prevOrders]);
    };

    return () => {
      ws.close();
    };
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#f8f9fa', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '320px', textAlign: 'center' }}>
          <h2 style={{ color: '#ff5722', marginBottom: '25px' }}>Restaurant Panel</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold', fontSize: '14px' }}>Mobile Number</label>
              <input 
                type="text" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                placeholder="Enter 10-digit number" 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: 'bold', fontSize: '14px' }}>Password / PIN</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password" 
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '14px', width: '100%', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#e9ecef', minHeight: '100vh', margin: 0 }}>
      <div style={{ backgroundColor: '#212529', color: 'white', padding: '20px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Khalo India - Live Cashier Panel</span>
        <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
      </div>
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h2>Live Orders</h2>
        {orders.length === 0 ? (
          <p style={{ color: '#6c757d', fontStyle: 'italic' }}>Waiting for new orders from customers...</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} style={{ background: 'white', borderLeft: '5px solid #ff5722', padding: '15px', marginBottom: '15px', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#ff5722' }}>New Order Received</h3>
              <p style={{ margin: '5px 0', color: '#495057', fontSize: '16px' }}>{order}</p>
              <span style={{ backgroundColor: '#28a745', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginTop: '10px' }}>Active</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
        
