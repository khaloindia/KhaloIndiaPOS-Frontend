import React, { useState } from 'react';

export default function SuperAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
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
      <div style={{ backgroundColor: '#1e1e1e', color: 'white', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#ff5722' }}>Super Admin Dashboard</h2>
        <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>

      <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
        <h3>Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #ff5722' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Total Restaurants</h4>
            <h2 style={{ margin: 0, color: '#333' }}>12</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #28a745' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Monthly SaaS Income</h4>
            <h2 style={{ margin: 0, color: '#333' }}>Rs. 36,000</h2>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #17a2b8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Today's Total Orders</h4>
            <h2 style={{ margin: 0, color: '#333' }}>148</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

