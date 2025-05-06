import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaCartArrowDown, FaHome, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Api from '../../utils/Api';
import { apiKey } from '../../config';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      
      console.log('carts: ', response.data.data)
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Failed to fetch carts: ", error)
    }
  }
  
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await Api.delete(`/delete-cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
  
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.activity.price * item.quantity,
    0
  );

  useEffect(() => {
    getCartItems()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-6xl p-6 pt-20 mx-auto mt-5">     
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <NavLink to="/" className="inline-flex items-center hover:text-blue-600">
                <FaHome className='w-3 h-3 mx-2 text-gray-400'/>
                Home
              </NavLink>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 6 10"
                >
                  <path d="M1 1L5 5L1 9" />
                </svg>
                <span className="text-gray-500">Cart</span>
              </div>
            </li>
          </ol>
        </nav>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white border border-dashed rounded-lg shadow-sm">
            <FaCartArrowDown className="w-16 h-16 text-gray-400" />
            <p className="mt-4 text-gray-400 text-md">Your cart is empty.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-3 bg-gray-50">
          {/* Cart Items */}
          <div className="overflow-x-auto shadow-lg lg:col-span-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Product</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Price /pax</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Qty</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Total Price</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center md:flex-row ">
                        <img
                          src={item.activity.imageUrls[0]}
                          alt={item.activity.title}
                          className="object-cover w-20 h-20 mr-4 rounded"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = '/assets/default-activity.jpg'; 
                          }}
                        />
                        <div className='flex flex-row mt-2 md:flex-col md:mt-0'>
                          <div className="mr-2 text-sm font-medium text-gray-900 md:mr-0">{item.activity.title}</div>
                          <div className="text-sm text-gray-500">{item.activity.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">Rp {item.activity.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                      Rp {(item.activity.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                         onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col justify-between h-full p-6 bg-white rounded-lg shadow-lg lg:col-span-1">
            <h2 className="mb-6 text-xl font-semibold text-blue-600">Order Summary</h2>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rp {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">Rp {(totalPrice * 0.1).toLocaleString()}</span>
              </div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            
            <div className="flex justify-between pt-4 mt-6 mb-4 text-base font-semibold text-blue-600">
              <span>Total</span>
              <span>Rp {(totalPrice * 1.1).toLocaleString()}</span>
            </div>

            <button className="w-full px-4 py-2 mt-auto font-medium text-white transition-colors bg-blue-600 border border-blue-600 rounded hover:bg-white hover:text-blue-600">
              Checkout
            </button>
          </div>

        </div>

        )}
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
