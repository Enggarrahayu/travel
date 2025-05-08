import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { apiKey } from "../../config";

const PaymentMethods = ({ selected, onChange }) => {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await Api.get("/payment-methods", {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        });
        setMethods(res.data.data);
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <label
          key={method.id}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selected === method.id}
              onChange={() => onChange(method.id)}
              className="accent-blue-600"
            />
            <span className="text-sm font-semibold text-gray-800">{method.name}</span>
          </div>
          <img
            src={method.imageUrl}
            alt={method.name}
            className="object-contain w-auto h-8"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-img.png"; 
            }}
          />
        </label>
      ))}
    </div>
  );
};

export default PaymentMethods;
