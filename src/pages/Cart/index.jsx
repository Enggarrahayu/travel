import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaCartArrowDown, FaHome, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Api from '../../utils/Api';
import { apiKey } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import FallbackImage from '../../utils/FallbackImage';
import PaymentMethods from '../../components/PaymentMethod';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const updateCart = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.post(
        `update-cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
      
      toast.success("Cart updated successfully", {
        position: "top-right",
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      console.log('Cart updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedUpdateCart = debounce(updateCart, 2000);
  
  
  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    const updatedItem = cartItems.find((item) => item.id === id);
    if (updatedItem) {
      const newQuantity = Math.max(1, updatedItem.quantity + delta);
      debouncedUpdateCart(id, newQuantity);
    }
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
      toast.success("Item removed from cart", {
        position: "top-right",
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const totalPrice = cartItems
  .filter((item) => selectedItems.includes(item.id))
  .reduce((sum, item) => sum + item.activity.price * item.quantity, 0);


  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  useEffect(() => {
    getCartItems()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-6xl p-6 pt-20 mx-auto mt-5">     
        <ToastContainer/>
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
                  <th className="px-3 py-3 text-sm font-medium text-left text-gray-500">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Product</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Price</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Qty</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Total Price</th>
                  <th className="px-6 py-3 text-sm font-medium text-left text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col items-center md:flex-row ">
                          <FallbackImage
                            src={item.activity.imageUrls[0]}
                            alt={item.activity.title}
                            className="object-cover w-20 h-20 mr-4 rounded"
                          />
                          <div className='flex flex-row mt-2 md:flex-col md:mt-0'>
                            <div className="mr-2 text-sm font-medium text-gray-900 md:mr-0">{item.activity.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-5">{item.activity.description}</div>
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
            <div className="p-4 text-sm text-gray-600">
              <h2 className='text-lg font-medium'>My Cart</h2>
              {selectedItems.length} selected items
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col justify-between h-full p-6 bg-white rounded-lg shadow-lg lg:col-span-1">
            <h2 className="mb-6 text-2xl font-semibold text-blue-600">Order Summary</h2>

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
            {/* Payment Method option     */}
            <div className='mb-4'>
              <h3 className='mb-3 text-lg font-semibold text-gray-600'>Payment Method</h3>             
              <PaymentMethods/>     
            </div>
            <div className="flex justify-between pt-4 mt-6 mb-4 text-base font-bold text-blue-600">
              <span className='text-xl'>Total Payment</span>
              <span className='text-gray-700'>Rp {(totalPrice * 1.1).toLocaleString()}</span>
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
