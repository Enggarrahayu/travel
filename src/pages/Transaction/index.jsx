import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { apiKey } from "../../config";
import Api from "../../utils/Api";
import Breadcrumb from "../../components/BreadCrumb";
import FallbackImage from "../../utils/FallbackImage";

const MyOrders = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await Api.get("/my-transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey,
        },
      });
      setTransactions(res.data.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  

  useEffect(() => {
    getTransactions()
  }, []);

  const filteredTransactions = transactions.filter(
    (trans) => activeTab === "all" || trans.status === activeTab
  );

  return (
    <>
      <Header />
      <Breadcrumb menu="My Orders" />
      <div className="min-h-screen p-10 mt-0 bg-gray-50">
        <h2 className="mb-2 text-3xl font-bold text-black">My Orders</h2>
        <p className="mb-8 text-gray-500 text-md">
          Review your upcoming and past trips. Track your bookings, manage payments, and get ready for your next escape.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['all', 'pending', 'success', 'cancelled', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 text-sm font-medium border rounded-full ${
                activeTab === status ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>        

        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500">No transactions found for this status.</p>
          ) : (
            filteredTransactions.map((trans) => (
              <div key={trans.invoiceId} className="p-4 bg-white rounded-lg shadow">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {/* Left side: Image */}
                  {trans.transaction_items[0]?.imageUrls?.[0] && (
                    <div className="flex-shrink-0 w-24 mx-auto mb-4 sm:w-32 sm:mb-0 sm:mx-0">
                      <FallbackImage
                        src={trans.transaction_items[0].imageUrls[0]}
                        alt="Transaction item visual"
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-blue-600">{trans.invoiceId}</span>
                      <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
                        {trans.status}
                      </span>
                    </div>

                    <div className="mb-1 text-lg font-bold text-gray-600">
                      {trans.transaction_items.map((item, idx) => (
                        <span key={idx}>{item.title}</span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500">
                      Order Date:{" "}
                      {new Date(trans.orderDate).toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm text-gray-500">
                      This transaction will be expired on{" "}
                      <span className="font-semibold">
                        {new Date(trans.expiredDate).toLocaleString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="mt-auto text-lg font-bold text-right text-blue-600">
                      Rp {trans.totalAmount.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>


      <Footer />
    </>
  );
};

export default MyOrders;
