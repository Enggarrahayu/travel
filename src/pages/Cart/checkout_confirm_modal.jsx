import React from 'react';

const CheckoutConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-lg mx-4 my-6 bg-gray-100 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-6 sm:mx-auto sm:max-w-lg">
        <h2 className='text-2xl font-bold text-gray-600'>Confirm Checkout</h2>
        <p className="mt-2 text-base text-gray-600">Are you sure you want to proceed with the checkout?</p>
        
        <div className="flex justify-center mt-6 gap-x-6">
          <button
            onClick={onCancel}
            className="w-full px-5 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full px-5 py-2 font-semibold text-blue-600 transition bg-white rounded-lg hover:bg-blue-700 hover:text-gray-200"
          >
            Confirm
          </button>
        </div>       
      </div>
    </div>
  );
};

export default CheckoutConfirmModal;
