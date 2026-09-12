import React, { useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  owner: string;
  phone: string;
  tables: number;
}

export default function SuperAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: 1, name: 'Biryani House', owner: 'Rahul Sen', phone: '9830000000', tables: 5 },
    { id: 2, name: 'Kolkata Fast Food', owner: 'Amit Roy', phone: '9831111111', tables: 4 }
  ]);
  const [newRestName, setNewRestName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTables, setNewTables] = useState('');

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
        tables: parseInt(newTables)
      };
      setRestaurants([...restaurants, newEntry]);
      setNewRestName('');
      setNewOwner('');
      setNewPhone('');
      setNewTables('');
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px', marginBottom: '40px' }}>
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

        <h3>Active Restaurants List</h3>
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {restaurants.map((r) => (
            <div key={r.id} style={{ padding: '15px 20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{r.name}</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Owner: {r.owner} | Phone: {r.phone} | Tables: {r.tables}</p>
              </div>
              <span style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>Active</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
                  
