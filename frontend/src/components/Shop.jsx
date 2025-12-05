import React, { useEffect, useState } from 'react';
import Header from './Header';
import { FaShoppingCart } from 'react-icons/fa';

const Sidebar = ({ cart, show, onClose, onCheckout }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${show ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ boxShadow: show ? '-2px 0 8px rgba(0,0,0,0.1)' : 'none' }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-xl font-bold">Cart</h3>
        <button onClick={onClose} className="text-2xl">&times;</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No items in cart.</p>
        ) : (
          cart.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 mb-4 border-b pb-2">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500 text-sm">${item.price}</div>
              </div>
              <div className="text-gray-700">x{item.qty}</div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={onCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const Shop = ({ cart, setCart }) => {
  const [items, setItems] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetch('/Data/PetItems.JSON')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleBuy = (item) => {
    alert(`You bought: ${item.name}`);
  };

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleCheckout = () => {
    alert('Checkout successful!');
    setCart([]);
    setShowSidebar(false);
  };

  return (
    <div className="relative min-h-screen pb-32">
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Shop Pet Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center border border-blue-100">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-500 mb-2">{item.description}</p>
              <span className="font-bold text-blue-600 mb-4">${item.price}</span>
              <div className="flex gap-2 mt-auto w-full">
                <button
                  className="btn bg-button-bg text-white rounded-[12px] hover:bg-button-bg/80 flex-1"
                  onClick={() => handleBuy(item)}
                >
                  Buy
                </button>
                <button
                  className="btn bg-inherit border-blue-100 text-blue-600 rounded-[12px] flex-1"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {cart.length > 0 && (
        <button
          className="fixed bottom-8 right-8 z-50 btn bg-button-bg text-white p-4 rounded-full shadow-lg hover:bg-button-bg/80 transition flex items-center gap-2 border-none"
          onClick={() => setShowSidebar((v) => !v)}
        >
          <FaShoppingCart size={24} />
          <span className="font-bold">{cart.reduce((a, b) => a + b.qty, 0)}</span>
        </button>
      )}
      <Sidebar
        cart={cart}
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Shop;
