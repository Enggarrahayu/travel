import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { apiKey } from "../../config";
import DealCard from "../../components/Deals/card";
import Api from "../../utils/Api";
import Breadcrumb from "../../components/BreadCrumb";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const getDeals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/promos", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey
        },
      });
  
      console.log(response.data.data);
      setDeals(response.data.data);
      
    } catch (error) {
      console.error("Failed to fetch deals data: ", error)
    }
  };

  useEffect(() => {
    getDeals()
  }, [])
  return (
    <>
      <Header />
      <Breadcrumb menu="Deals"/>
      <div className="min-h-screen p-10 mt-0 bg-gray-50">
        <h2 className="mb-1 text-3xl font-bold text-black">Travel Deals & Getaways</h2>
        <p className="mb-8 text-gray-500 text-md">Unwrap the Best Travel Offers – Handpicked for Your Next Escape</p>
        <div className="space-y-16">
          <div>
            <DealCard deals={deals}/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Deals;
