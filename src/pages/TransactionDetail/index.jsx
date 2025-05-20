import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { apiKey } from "../../config";
import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import FallbackImage from "../../utils/FallbackImage";
import { FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import CancelConfirmModal from "./cancelConfirmModal";

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);


    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await Api.get(`/transaction/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        });
        setTransaction(res.data.data);
      } catch (err) {
        console.error("Error fetching transaction detail:", err);
      }
    };
  
    useEffect(() => {

      fetchTransaction();
    }, [id]);


    const handleCancelCancel = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  const handleCancel = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsModalOpen(true);
  };
    const handleConfirmCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("transaction id", selectedTransactionId)
      const res = await Api.post(
        `/cancel-transaction/${selectedTransactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );
       toast.success("Transaction cancelled successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      await fetchTransaction();
    } catch (err) {
      console.error("Error cancelling transaction:", err);
    } finally {
      setIsModalOpen(false);
      setSelectedTransactionId(null);
    }
  };

  const handleUploadProof = () => {
    alert("Upload Payment Proof Clicked");
  };

  if (!transaction) return <div className="p-10">Loading...</div>;

  const {
    invoiceId,
    status,
    totalAmount,
    orderDate,
    expiredDate,
    proofPaymentUrl,
    payment_method,
    transaction_items,
  } = transaction;
  return (
    <>
      <Header />
      <Breadcrumb menu="My Orders"/>
      <div className="min-h-screen p-10 mt-0 bg-gray-50">
        <ToastContainer/>
        <h2 className="mb-2 text-3xl font-bold text-black">My Orders</h2>
        <p className="mb-8 text-gray-500 text-md">
          View detail information about your order
        </p>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-blue-600">{invoiceId}</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              status === 'success' ? 'bg-green-100 text-green-800' :
              status === 'pending' ? 'bg-blue-100 text-blue-800' :
              status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Order Items</h3>
            {transaction_items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 mb-3 rounded-lg bg-gray-50">
                <FallbackImage 
                  src={item.imageUrls[0]} 
                  alt={item.title} 
                  className="object-cover border border-gray-200 rounded-lg h-25 w-25"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-gray-500">{item.quantity} pax</span>
                    <div className="flex items-center gap-2">
                      {item.price_discount && (
                        <span className="text-sm text-gray-400 line-through">
                          Rp {(item.price + item.price_discount).toLocaleString("id-ID")}
                        </span>
                      )}
                      <span className="font-medium text-blue-600">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className="p-4 mb-6 rounded-lg bg-blue-50">
            <h3 className="flex items-center gap-2 mb-3 font-semibold text-blue-800 text-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Payment Method
            </h3>
            <div className="flex items-center gap-3">
              {payment_method.imageUrl && (
                <FallbackImage
                  src={payment_method.imageUrl}
                  alt={payment_method.name}
                  className="object-contain w-8 h-8"
                />
              )}
              <div>
                <p className="font-medium">{payment_method.name}</p>
                <p className="flex p-1 my-1 text-sm text-blue-600 bg-blue-100 rounded-lg gap-x-2">
                  <span>{payment_method.virtual_account_number}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(payment_method.virtual_account_number);
                      toast.info("Successfully copied virtual account number!", {
                              position: "top-right",
                              autoClose: 2000, 
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              className: "text-sm",
                            });
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800 focus:outline-none"
                  >
                    <FaCopy/>
                  </button>                 
                </p>
                <p className="text-xs text-gray-500">{payment_method.virtual_account_name}</p>
              </div>
            </div>
          </div>

          {/* Total + Expiration */}
          <div className="flex items-center justify-between p-3 mb-6 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Expired: <span className="font-medium text-red-500">
                {new Date(expiredDate).toLocaleString("id-ID")}
              </span></span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              Rp {totalAmount.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Payment Proof */}
          {proofPaymentUrl && (
            <div className="p-3 mb-6 rounded-lg bg-gray-50">
              <h3 className="mb-2 font-semibold text-gray-800 text-md">Proof of Payment</h3>
              <a
                href={proofPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                View Uploaded Proof
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-6 p-6 sm:flex-row">
            {status === 'pending' && (
              <>                
                <button
                  onClick={() => handleCancel(transaction.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Cancel Transaction
                </button>
                
                {/* confirm Cancel transaction modal */}
                {isModalOpen && (
                  <CancelConfirmModal
                    onCancel={handleCancelCancel}
                    onConfirm={handleConfirmCancel}
                  />
                )}
                <button
                  onClick={handleUploadProof}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Upload Payment Proof
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer/>    
    </> 
  );
};

export default TransactionDetail;
