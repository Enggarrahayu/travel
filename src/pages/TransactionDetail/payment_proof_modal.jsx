import { useState } from "react";
import Api from "../../utils/Api";
import { apiKey } from "../../config";
import { toast } from "react-toastify";

const PaymentProofModal = ({ transactionId, onClose, onUpload }) => {
  
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const token = localStorage.getItem("token");

      // Step 1: Upload image 
      const formData = new FormData();
      formData.append("image", file);

      const uploadRes = await Api.post("/upload-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey, 
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadRes);
      const proofPaymentUrl = uploadRes.data?.url;

      if (!proofPaymentUrl) {
        throw new Error("Failed to retrieve image URL from response.");
      }

      // Step 2: Update transaction with proofPaymentUrl
      const res = await Api.post(
        `/update-transaction-proof-payment/${transactionId}`,
        { proofPaymentUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey
          },
        }
      );

      console.log("Transaction updated:", res.data);
      onUpload(res.data); 
      onClose();          
      setFile(null); 
      toast.success("Payment Proof Uploaded Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });      
    } catch (err) {
      console.error("Upload or update failed:", err);
      alert("Something went wrong during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
      };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="w-full max-w-lg mx-4 my-6 bg-gray-100 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] p-6 sm:mx-auto sm:max-w-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Upload Payment Proof
        </h2>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="block w-full mb-6 text-sm text-gray-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {previewUrl && (
          <div className="mt-4 text-center">          
            <img
              src={previewUrl}
              alt="Selected proof"
              className="object-contain w-full border border-gray-300 rounded-lg max-h-64"
            />
          </div>
          )}
        
        <div className="flex justify-center mt-6 gap-x-6">
          <button
            onClick={onClose}
            className="w-full px-5 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload} disabled={isUploading}
            className="w-full px-5 py-2 font-semibold text-blue-600 transition bg-white rounded-lg hover:bg-blue-700 hover:text-gray-200"
          >
              {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>       
      </div>
    </div>
  );
};

export default PaymentProofModal;
