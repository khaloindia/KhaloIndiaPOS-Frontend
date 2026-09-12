import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  table: string;
  items: string;
  total_amount: number;
  status: 'new' | 'preparing' | 'served';
}

interface Table {
  id: number;
  name: string;
  status: 'free' | 'occupied' | 'billing';
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  available: boolean;
}

export default function RestaurantPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("khalo_logged_in") === "true";
  });

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'tables' | 'menu' | 'qr'>('orders');

  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [preparingOrders, setPreparingOrders] = useState<Order[]>([]);
  const [servedOrders, setServedOrders] = useState<Order[]>([]);

  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: 'Table 1', status: 'free' },
    { id: 2, name: 'Table 2', status: 'free' },
    { id: 3, name: 'Table 3', status: 'free' },
    { id: 4, name: 'Table 4', status: 'free' },
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Special Chicken Biryani', price: 199, available: true },
    { id: 2, name: 'Desi Cold Coffee', price: 89, available: true },
  ]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const ws = new WebSocket("wss://khaloindiapos-backend-1.onrender.com/ws/cashier");

    ws.onmessage = (event) => {
      const newOrder: Order = {
        id: Date.now().toString(),
        table: "Table 1",
        items: event.data,
        total_amount: 199,
        status: 'new'
      };

      setNewOrders((prev) => [newOrder, ...prev]);

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
      localStorage.setItem("khalo_logged_in", "true");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("khalo_logged_in");
  };

  const moveToPreparing = (order: Order) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== order.id));
    setPreparingOrders((prev) => [...prev, { ...order, status: 'preparing' }]);
  };

  const rejectOrder = (orderId: string) => {
    setNewOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const moveToServed = (order: Order) => {
    setPreparingOrders((prev) => prev.filter((o) => o.id !== order.id));
    setServedOrders((prev) => [...prev, { ...order, status: 'served' }]);
  };

  const cycleTableStatus = (id: number) => {
    setTables(tables.map(t => {
      if (t.id === id) {
        let nextStatus: 'free' | 'occupied' | 'billing' = 'free';
        if (t.status === 'free') nextStatus = 'occupied';
        else if (t.status === 'occupied') nextStatus = 'billing';
        else if (t.status === 'billing') nextStatus = 'free';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const toggleMenuAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => {
      if (item.id === id) {
        return { ...item, available: !item.available };
      }
      return item;
    }));
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
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#e9ecef', minHeight: '100vh', margin: 0, display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ backgroundColor: '#212529', color: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Khalo India - Cashier Dashboard</h2>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('orders')} style={{ backgroundColor: activeTab === 'orders' ? '#ff5722' : '#495057', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Live Orders</button>
          <button onClick={() => setActiveTab('tables')} style={{ backgroundColor: activeTab === 'tables' ? '#ff5722' : '#495057', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Table Management</button>
          <button onClick={() => setActiveTab('menu')} style={{ backgroundColor: activeTab === 'menu' ? '#ff5722' : '#495057', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Stock Toggle</button>
          <button onClick={() => setActiveTab('qr')} style={{ backgroundColor: activeTab === 'qr' ? '#ff5722' : '#495057', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Table QR Codes</button>
        </div>

        <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>

      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flex: 1, padding: '20px', gap: '20px', overflowX: 'auto' }}>
          <div style={{ flex: 1, backgroundColor: '#fff3cd', borderRadius: '8px', padding: '15px', minWidth: '280px' }}>
            <h3 style={{ color: '#856404', marginTop: 0 }}>New Orders ({newOrders.length})</h3>
            {newOrders.map((order) => (
              <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #dc3545', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{order.table}</h4>
                <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => moveToPreparing(order)} style={{ flex: 1, backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Accept</button>
                  <button onClick={() => rejectOrder(order.id)} style={{ flex: 1, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, backgroundColor: '#cce5ff', borderRadius: '8px', padding: '15px', minWidth: '280px' }}>
            <h3 style={{ color: '#004085', marginTop: 0 }}>Preparing ({preparingOrders.length})</h3>
            {preparingOrders.map((order) => (
              <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #ffc107', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{order.table}</h4>
                <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
                <button onClick={() => moveToServed(order)} style={{ width: '100%', backgroundColor: '#17a2b8', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Mark Ready</button>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, backgroundColor: '#d4edda', borderRadius: '8px', padding: '15px', minWidth: '280px' }}>
            <h3 style={{ color: '#155724', marginTop: 0 }}>Served ({servedOrders.length})</h3>
            {servedOrders.map((order) => (
              <div key={order.id} style={{ backgroundColor: 'white', borderLeft: '6px solid #28a745', padding: '15px', marginBottom: '15px', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{order.table}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>{order.items}</p>
                <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '12px' }}>Completed</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tables' && (
        <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto', width: '100%', boxSizing: 'border-box' }}>
          <h3>Restaurant Table Status</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {tables.map(table => {
              let bg = '#28a745';
              let label = 'Available / Free';
              if (table.status === 'occupied') { bg = '#dc3545'; label = 'Ordered / Eating'; }
              if (table.status === 'billing') { bg = '#ffc107'; label = 'Bill Requested'; }

              return (
                <div 
                  key={table.id} 
                  onClick={() => cycleTableStatus(table.id)}
                  style={{ backgroundColor: bg, color: table.status === 'billing' ? '#000' : '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                >
                  <h2 style={{ margin: '0 0 10px 0' }}>{table.name}</h2>
                  <p style={{ margin: 0, fontSize: '14px' }}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto', width: '100%', boxSizing: 'border-box' }}>
          <h3>Menu Stock Control</h3>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginTop: '20px' }}>
            {menuItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                  <span style={{ color: '#666' }}>Rs. {item.price}</span>
                </div>
                <div>
                  <button 
                    onClick={() => toggleMenuAvailability(item.id)}
                    style={{ backgroundColor: item.available ? '#28a745' : '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {item.available ? 'In Stock (ON)' : 'Out of Stock (OFF)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* নতুন ট্যাব ৪: টেবিল কিউআর কোড জেনারেটর */}
      {activeTab === 'qr' && (
        <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto', width: '100%', boxSizing: 'border-box' }}>
          <h3>Table QR Codes (Scan to open table menu)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {tables.map(table => {
              const menuUrl = `https://khalo-india-pos-frontend.vercel.app/menu?table=${table.name}`;
              const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(menuUrl)}`;

              return (
                <div key={table.id} style={{ background: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{table.name}</h3>
                  <img src={qrApiUrl} alt={`QR Code for ${table.name}`} style={{ width: '150px', height: '150px', border: '1px solid #ddd', padding: '5px', borderRadius: '5px' }} />
                  <p style={{ margin: '15px 0 0 0', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>{menuUrl}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

