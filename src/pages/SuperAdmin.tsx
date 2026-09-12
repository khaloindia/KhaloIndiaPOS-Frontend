import React, { useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  owner: string;
  phone: string;
  tables: number;
  expiryDate: string;
}

interface CustomerLead {
  id: number;
  restaurantName: string;
  customerName: string;
  customerPhone: string;
  visitDate: string;
  totalBill: number;
}

export default function SuperAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'restaurants' | 'subscriptions' | 'crm'>('overview');

  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: 1, name: 'Biryani House', owner: 'Rahul Sen', phone: '9830000000', tables: 5, expiryDate: '2026-09-15' },
    { id: 2, name: 'Kolkata Fast Food', owner: 'Amit Roy', phone: '9831111111', tables: 4, expiryDate: '2026-09-10' }
  ]);
  const [newRestName, setNewRestName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTables, setNewTables] = useState('');

  // ডামি লিড ডাটা (CRM / Data Export এর জন্য)
  const [leads] = useState<CustomerLead[]>([
    { id: 1, restaurantName: 'Biryani House', customerName: 'Sourav Ganguly', customerPhone: '9830111222', visitDate: '2026-09-10', totalBill: 650 },
    { id: 2, restaurantName: 'Biryani House', customerName: 'Priyanka Bose', customerPhone: '9830333444', visitDate: '2026-09-11', totalBill: 420 },
    { id: 3, restaurantName: 'Kolkata Fast Food', customerName: 'Arijit Singh', customerPhone: '9830555666', visitDate: '2026-09-11', totalBill: 310 }
  ]);
  const [selectedRestFilter, setSelectedRestFilter] = useState('All');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleAddRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRestName && newOwner && newPhone && newTables) {
      const newEntry: Restaurant = {
        id: Date.now(),
        name: newRestName,
        owner: newOwner,
        phone: newPhone,
        tables: parseInt(newTables),
        expiryDate: '2026-10-01'
      };
      setRestaurants([...restaurants, newEntry]);
      setNewRestName('');
      setNewOwner('');
      setNewPhone('');
      setNewTables('');
    }
  };

  // এক্সেল/সিএসভি ডাউনলোড করার ফাংশন
  const downloadCSV = () => {
    const filteredLeads = selectedRestFilter === 'All' 
      ? leads 
      : leads.filter(l => l.restaurantName === selectedRestFilter);

    let csvContent = "data:text/csv;charset=utf-8,Restaurant,Customer Name,Phone,Visit Date,Bill Amount\n";
    filteredLeads.forEach(l => {
      csvContent += `"${l.restaurantName}","${l.customerName}","${l.customerPhone}","${l.visitDate}",${l.totalBill}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KhaloIndia_Leads_${selectedRestFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
        <div style={{ background: '#1e1e1e', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', width: '100%', maxWidth: '350px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ color: '#ff5722', marginBottom: '25px' }}>Super Admin Portal</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#bbb', fontSize: '14px' }}>Secret Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter admin email" 
                required 
                style={{ width: '100%', padding: '12px', background: '#2d2d2d', border: '1px solid #444', borderRadius: '5px', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#bbb', fontSize: '14px' }}>Secure Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password" 
                required 
                style={{ width: '100%', padding: '12px', background: '#2d2d2d', border: '1px solid #444', borderRadius: '5px', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '14px', width: '100%', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
              Access Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0 }}>
      <div style={{ backgroundColor: '#1e1e1e', color: 'white', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#ff5722' }}>Super Admin Dashboard</h2>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('overview')} style={{ backgroundColor: activeTab === 'overview' ? '#ff5722' : '#333', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Overview</button>
          <button onClick={() => setActiveTab('restaurants')} style={{ backgroundColor: activeTab === 'restaurants' ? '#ff5722' : '#333', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Onboarding & QR</button>
          <button onClick={() => setActiveTab('subscriptions')} style={{ backgroundColor: activeTab === 'subscriptions' ? '#ff5722' : '#333', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Subscriptions</button>
          <button onClick={() => setActiveTab('crm')} style={{ backgroundColor: activeTab === 'crm' ? '#ff5722' : '#333', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Data Export & CRM</button>
        </div>

        <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>

      <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
        
        {activeTab === 'overview' && (
          <div>
            <h3>System Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #ff5722' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Restaurants</h4>
                <h2 style={{ margin: 0, color: '#333' }}>{restaurants.length}</h2>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #28a745' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Monthly SaaS Income</h4>
                <h2 style={{ margin: 0, color: '#333' }}>Rs. {restaurants.length * 3000}</h2>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #17a2b8' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Today's Total Orders</h4>
                <h2 style={{ margin: 0, color: '#333' }}>148</h2>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div>
            <h3>Restaurant Onboarding</h3>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <form onSubmit={handleAddRestaurant} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <input 
                  type="text" 
                  placeholder="Restaurant Name" 
                  value={newRestName} 
                  onChange={(e) => setNewRestName(e.target.value)} 
                  required 
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                <input 
                  type="text" 
                  placeholder="Owner Name" 
                  value={newOwner} 
                  onChange={(e) => setNewOwner(e.target.value)} 
                  required 
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                <input 
                  type="text" 
                  placeholder="Mobile Number" 
                  value={newPhone} 
                  onChange={(e) => setNewPhone(e.target.value)} 
                  required 
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                <input 
                  type="number" 
                  placeholder="Total Tables" 
                  value={newTables} 
                  onChange={(e) => setNewTables(e.target.value)} 
                  required 
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
                <button type="submit" style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', gridColumn: '1 / -1' }}>
                  Add New Restaurant
                </button>
              </form>
            </div>

            <h3>Active Restaurants & Table QR Codes</h3>
            {restaurants.map((r) => (
              <div key={r.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#ff5722' }}>{r.name} (Owner: {r.owner})</h4>
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                  {Array.from({ length: r.tables }, (_, i) => i + 1).map((tableNum) => {
                    const menuUrl = `https://khalo-india-pos-frontend.vercel.app/menu?table=Table ${tableNum}`;
                    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(menuUrl)}`;
                    return (
                      <div key={tableNum} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '5px', textAlign: 'center', minWidth: '120px' }}>
                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '12px' }}>Table {tableNum}</p>
                        <img src={qrApiUrl} alt={`QR Table ${tableNum}`} style={{ width: '100px', height: '100px' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div>
            <h3>Subscription Billing Tracker</h3>
            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden', marginTop: '20px' }}>
              {restaurants.map((r) => (
                <div key={r.id} style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{r.name}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Phone: {r.phone} | Expiry Date: {r.expiryDate}</p>
                  </div>
                  <span style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
                    Payment Due Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'crm' && (
          <div>
            <h3>Customer Data Export & Lead Generation</h3>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Select Restaurant</label>
                  <select 
                    value={selectedRestFilter} 
                    onChange={(e) => setSelectedRestFilter(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="All">All Restaurants</option>
                    {restaurants.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    onClick={downloadCSV}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '11px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Download Excel / CSV
                  </button>
                </div>
              </div>

              <h4>Recent Customer Leads Preview</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f1f1', textAlign: 'left' }}>
                      <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Restaurant</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Customer Name</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Phone Number</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Visit Date</th>
                      <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Bill Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedRestFilter === 'All' ? leads : leads.filter(l => l.restaurantName === selectedRestFilter)).map(l => (
                      <tr key={l.id}>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{l.restaurantName}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{l.customerName}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{l.customerPhone}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>{l.visitDate}</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Rs. {l.totalBill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
