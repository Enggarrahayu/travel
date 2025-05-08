import { useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../utils/Api";
import { apiKey } from "../../config";
import DealDetailModal from "../../pages/DealDetail/modal";

const DealCard = ({ deals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deal, setDeal] = useState(null)

    
  const getDealDetail = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get(`/promo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      return response.data.data; 
    } catch (error) {
      console.error("Failed to fetch deal detail: ", error);
      return null;
    }
  };
  
  
  return (
    <>
      {/* render deal detail modal */}
      {isModalOpen && deal && (
        <DealDetailModal
          deal={deal}
          onClose={() => setIsModalOpen(false)}
        />
      )}     
      
      
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deals.map((item, index) => (
                <div key={index} className="flex flex-col justify-between p-6 overflow-hidden text-white transition-transform shadow-md bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl hover:scale-105">
                  <div>
                    <h3 className="text-2xl font-bold">{ item.title }</h3>
                    <p className="mt-2 text-sm">Save up to { item.promo_discount_price } on selected destinations!</p>
                  </div>
                  <button
                    className="px-4 py-2 mt-4 font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-200"
                    onClick={async () => {
                      const detail = await getDealDetail(item.id);
                      if (detail) {
                        setDeal(detail);
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    Claim Now
                  </button>
                </div>
              ))}
    </div>     
    </> 
  );
};

export default DealCard;
