import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  table: string;
  items: string;
  total_amount: number;
  status: 'new' | 'preparing' | 'served';
}

export default function RestaurantPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  
  // কানবান বোর্ডের ৩টি কলামের স্টেট
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [preparingOrders, setPreparingOrders] = useState<Order[]>([]);
  const [servedOrders, setServedOrders] = useState<Order[]>([]);

  // WebSockets কানেকশন (লাইভ অর্ডারের জন্য)
  useEffect(() => {
    if (!isLoggedIn) return;

    const ws = new WebSocket("wss://khaloindiapos-backend-1.onrender.com/ws/cashier");

    ws.onmessage = (event) => {
      // সার্ভার থেকে আসা ডেটা পার্স করে নতুন অর্ডার অবজেক্ট বানানো
      const newOrder: Order = {
        id: Date.now().toString(),
        table: "Table 1",
        items: event.data,
        total_amount: 199,
        status: 'new'
      };

      setNewOrders((prev) => [newOrder, ...prev]);

      // নতুন অর্ডার এলে "টিং!" সাউন্ড বাজানোর জন্য ব্রাউজার অ্যালার্ট বা সাউন্ড ট্রিগার
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance("New Order Received");
        window.speechSynthesis.speak(speech);
      }
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

  // অর্ডার Accept করার ফাংশন (New -> Preparing)
  const moveToPreparing = (order: Order) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== order.id));
    setPreparingOrders((prev) => [...prev, { ...order, status: 'preparing' }]);
  };

  // অর্ডার Reject করার ফাংশন
  const rejectOrder = (orderId: string) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // অর্ডার Served করার ফাংশন (Preparing -> Served)
  const moveToServed = (order: Order) => {
    setPreparingOrders((prev) => prev.filter((o) => o.id !== order.id));
    setServedOrders((prev) => [...prev, { ...order, status: 'served' }]);
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

  // ৩ কলামের কানবান বোর্ড লেআউট (টেবলেট/ল্যাপটপ ভিউ)
  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#e9ecef', minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#212529', color: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Khalo India - Live Kitchen & Cashier Dashboard</h2>
        <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '20px', gap: '20px', overflowX: 'auto' }}>
        
        {/* কলাম ১: New Orders */}
        <div style={{ flex: 1, backgroundColor: '#fff3cd', borderRadius: '8px', padding: '15px', minWidth: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#856404', borderBottom: '2px solid #ffeeba', paddingBottom: '10px', marginTop: 0 }}>New Orders ({newOrders.length})</h3>
          {newOrders.map((order) => (
            <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #dc3545', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{order.table}</h4>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => moveToPreparing(order)} style={{ flex: 1, backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Accept</button>
                <button onClick={() => rejectOrder(order.id)} style={{ flex: 1, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* কলাম ২: Preparing */}
        <div style={{ flex: 1, backgroundColor: '#cce5ff', borderRadius: '8px', padding: '15px', minWidth: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#004085', borderBottom: '2px solid #b8daff', paddingBottom: '10px', marginTop: 0 }}>Preparing ({preparingOrders.length})</h3>
          {preparingOrders.map((order) => (
            <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #ffc107', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{order.table}</h4>
              <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
              <button onClick={() => moveToServed(order)} style={{ width: '100%', backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Mark as Ready / Served</button>
            </div>
          ))}
        </div>

        {/* কলাম ৩: Served */}
        <div style={{ flex: 1, backgroundColor: '#d4edda', borderRadius: '8px', padding: '15px', minWidth: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#155724', borderBottom: '2px solid #c3e6cb', paddingBottom: '10px', marginTop: 0 }}>Served ({servedOrders.length})</h3>
          {servedOrders.map((order) => (
            <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #28a745', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>{order.table}</h4>
              <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
              <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '12px' }}>Completed</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
