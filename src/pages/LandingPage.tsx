import { Link } from 'react-router-dom';
import { useState } from 'formidable' // safe import or standard react state

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', restaurant: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', margin: 0, padding: 0, backgroundColor: '#fff', color: '#333' }}>
      
      {/* টপ হেডার */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1000 }}>
        <h2 style={{ margin: 0, color: '#ff5722', fontSize: '22px', fontWeight: 'bold' }}>KHALO INDIA POS</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/restaurant" style={{ backgroundColor: '#f8f9fa', color: '#333', border: '1px solid #ddd', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Cashier Login
          </Link>
          <Link to="/admin" style={{ backgroundColor: '#ff5722', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Admin Portal
          </Link>
        </div>
      </div>

      {/* হিরো সেকশন */}
      <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#111', marginBottom: '20px' }}>
          Restaurant POS software made simple!
        </h1>
        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '30px' }}>
          Manages all your restaurant operations efficiently so that you can focus on growing your brand, like a real boss!
        </p>
        <Link to="/restaurant" style={{ backgroundColor: '#dc3545', color: 'white', padding: '14px 30px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'inline-block', boxShadow: '0 4px 10px rgba(220,53,69,0.3)' }}>
          Take a free demo
        </Link>
      </div>

      {/* ট্রাস্ট সেকশন (ব্র্যান্ড লোগো প্রিভিউ) */}
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fafafa' }}>
        <p style={{ color: '#777', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '13px', marginBottom: '30px' }}>Trusted by 1,00,000+ restaurants</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.7, fontWeight: 'bold', fontSize: '20px', color: '#555' }}>
          <span>Biryani House</span>
          <span>Kolkata Fast Food</span>
          <span>Desi Tadka</span>
          <span>Royal Cafe</span>
        </div>
      </div>

      {/* ফিচার সেকশন ১: 3-Click Billing */}
      <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: 'auto' }}>
        <p style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>Smart POS Features</p>
        <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>A restaurant POS made for all your needs</h2>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>A quick and easy-to-use restaurant billing software that makes managing high order volumes butter smooth.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div style={{ background: '#fff0f0', padding: '30px', borderRadius: '10px', borderLeft: '5px solid #dc3545' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Quick 3-Click Billing</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Punch bills, manage table status, and generate KOT instantly without delay.</p>
          </div>
          <div style={{ background: '#f0f8ff', padding: '30px', borderRadius: '10px', borderLeft: '5px solid #007bff' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Real-time Kitchen Kanban</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>WebSocket powered live order board with instant audio alerts for kitchen staff.</p>
          </div>
          <div style={{ background: '#f4fdf4', padding: '30px', borderRadius: '10px', borderLeft: '5px solid #28a745' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Table QR Ordering</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Empower customers to scan, browse digital menus, and order directly from tables.</p>
          </div>
        </div>
      </div>

      {/* আউটলেট টাইপস */}
      <div style={{ backgroundColor: '#dc3545', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Outlet Types</p>
        <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Built for all types of food business</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', maxWidth: '900px', margin: 'auto' }}>
          {['Fine Dine', 'QSR & Cafes', 'Cloud Kitchens', 'Food Courts', 'Pizzeria', 'Bakery'].map((type, idx) => (
            <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px' }}>
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* বুক এ ফ্রি ডেমো ফর্ম (লিড জেনারেশন) */}
      <div style={{ padding: '70px 20px', maxWidth: '700px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '10px' }}>Book a Free Demo</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Book a 10-minute demo to see how Khalo India POS can work for your restaurant.</p>
        
        {submitted ? (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '20px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            Thank you! Our sales team will call you within 15 minutes.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input 
              type="text" placeholder="Full Name*" required 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="email" placeholder="Email Address" 
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="text" placeholder="Phone Number*" required 
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="text" placeholder="City / Location" 
              value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="text" placeholder="Restaurant Name" 
              value={formData.restaurant} onChange={e => setFormData({...formData, restaurant: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '5px', gridColumn: '1 / -1', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '15px', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', gridColumn: '1 / -1' }}>
              Submit Demo Request
            </button>
          </form>
        )}
      </div>

      {/* ফুটার */}
      <div style={{ backgroundColor: '#212529', color: '#aaa', padding: '40px 20px', textAlign: 'center', fontSize: '14px' }}>
        <p style={{ margin: '0 0 10px 0', color: 'white', fontWeight: 'bold' }}>Khalo India POS Systems Pvt. Ltd.</p>
        <p style={{ margin: 0 }}>Kolkata, West Bengal, India | Support: support@khaloindiapos.com</p>
      </div>

    </div>
  );
}
