import { FaCopy } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";

function DealDetailModal({ deal, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <ToastContainer/>  
      <div className="w-full max-w-lg mx-4 my-6 bg-gray-100 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-6 sm:mx-auto sm:max-w-lg">
        
        {/* Gambar Promo */}
        {deal.imageUrl && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={deal.imageUrl}
              alt="Promo"
              className="object-cover w-full h-52"
            />
          </div>
        )}

        {/* Judul Promo */}
        <h2 className="text-2xl font-extrabold text-blue-600">{deal.title}</h2>
        <p className="mt-2 text-base text-gray-600">
          Enjoy discounts up to <span className="font-semibold text-blue-600">{deal.promo_discount_price}</span> for selected destinations!
        </p>

        <hr className="my-4 border-gray-200" />

        {/* Detail Promo */}
        <div className="space-y-3 text-sm text-gray-700">
          {deal.promo_code && (
            <div>
              <div className="mb-1 text-xs text-gray-500">Promo Code</div>
              <div className="inline-flex items-center px-3 py-1 space-x-2 font-semibold text-blue-700 bg-blue-100 rounded-md">
                <span>{deal.promo_code}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(deal.promo_code);
                    toast.info("Successfully copied promo code!", {
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
              </div>
            </div>
          )}
          {deal.discount && (
            <div>
              <div className="text-xs text-gray-500">Discount</div>
              <p className="font-medium">{deal.discount}%</p>
            </div>
          )}
          {deal.minimum_claim_price && (
            <div>
              <div className="text-xs text-gray-500">Mininum Transaction</div>
              <p className="font-medium">Rp{deal.minimum_claim_price.toLocaleString("id-ID")}</p>
            </div>
          )}
          {deal.terms_condition && (
            <div>
              <div className="text-xs text-gray-500">Terms and Condition</div>
              <p className="mt-1">{deal.terms_condition.replace(/^<p>|<\/p>$/g, '')}</p>
            </div>
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="w-full px-5 py-2 font-semibold text-blue-700 transition bg-gray-200 rounded-lg hover:bg-blue-700 hover:text-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealDetailModal;
