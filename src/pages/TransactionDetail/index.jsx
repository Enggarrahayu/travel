import Breadcrumb from "../../components/BreadCrumb";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const TransactionDetail = () => {
    
  return (
    <>
      <Header />
      <Breadcrumb menu="My Orders"/>
      <div className="min-h-screen p-10 mt-0 bg-gray-50">
        <h2 className="mb-2 text-3xl font-bold text-black">My Orders</h2>
        <p className="mb-8 text-gray-500 text-md">
          View detail information about your order
        </p>
      </div>
      <Footer/>
    
    </> 
  );
};

export default TransactionDetail;
