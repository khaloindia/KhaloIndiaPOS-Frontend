import { useState, useEffect } from 'react';

interface MenuItem {
  id: number;
  item_name: string;
  price: number;
  category: string;
  is_available: boolean;
}

export default function CustomerMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ [key: string]: { item: MenuItem; qty: number } }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ব্যাকএন্ড থেকে মেনু ডাটা ফেচ করা
  useEffect(() => {
    fetch("https://khaloindiapos-backend-1.onrender.com/menu-items")
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  const addToCart = (item: MenuItem) => {
    if (!item.is_available) return;
    setCart((prev) => {
      const currentQty = prev[item.id] ? prev[item.id].qty : 0;
      return {
        ...prev,
        [item.id]: { item, qty: currentQty + 1 }
      };
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      if (!prev[item.id]) return prev;
      const currentQty = prev[item.id].qty;
      if (currentQty === 1) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return {
        ...prev,
        [item.id]: { item, qty: currentQty - 1 }
      };
    });
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.qty, 0);
  };

  const calculateTotalCount = () => {
    return Object.values(cart).reduce((sum, cartItem) => sum + cartItem.qty, 0);
  };

  const placeOrder = async () => {
    const itemsDescription = Object.values(cart)
      .map((c) => `${c.qty}x ${c.item.item_name}`)
      .join(", ");

    try {
      await fetch("https://khaloindiapos-backend-1.onrender.com/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "Table 1",
          items: itemsDescription,
          total_amount: calculateTotal()
        })
      });

      setOrderPlaced(true);
      setCart({});
    } catch (error) {
      alert("Failed to place order. Please check connection.");
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI', backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '80px' }}>
      <div style={{ backgroundColor: '#ff5722', color: 'white', padding: '20px', textAlign: 'center', fontSize: '22px', fontWeight: 'bold' }}>
        Khalo India - Digital Menu
      </div>

      <div style={{ padding: '15px', maxWidth: '600px', margin: 'auto' }}>
        {orderPlaced && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
            Order placed successfully! Kitchen is processing your food.
          </div>
        )}

        {menuItems.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>Loading menu items from database...</p>
        ) : (
          menuItems.map((item) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '10px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: item.is_available ? 1 : 0.6 }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>{item.item_name}</h3>
                <p style={{ margin: '0 0 5px 0', color: '#777', fontSize: '14px' }}>{item.category}</p>
                <span style={{ fontWeight: 'bold', color: '#ff5722', fontSize: '16px' }}>Rs. {item.price}</span>
              </div>
              <div>
                {item.is_available ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {cart[item.id] && (
                      <>
                        <button onClick={() => removeFromCart(item)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>-</button>
                        <span style={{ fontWeight: 'bold' }}>{cart[item.id].qty}</span>
                      </>
                    )}
                    <button onClick={() => addToCart(item)} style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Add</button>
                  </div>
                ) : (
                  <span style={{ backgroundColor: '#6c757d', color: 'white', padding: '6px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>Out of Stock</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {calculateTotalCount() > 0 && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#343a40', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <span style={{ fontWeight: 'bold' }}>{calculateTotalCount()} Items</span> | Total: <span style={{ color: '#ff5722', fontWeight: 'bold' }}>Rs. {calculateTotal()}</span>
          </div>
          <button onClick={placeOrder} style={{ backgroundColor: '#ff5722', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>Place Order</button>
        </div>
      )}
    </div>
  );
}
                   
