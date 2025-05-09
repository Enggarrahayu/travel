import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ActivityCard from "../../components/Activity/card";
import DealCard from "../../components/Deals/card";
import Api from "../../utils/Api";
import CategoryCard from "../../components/Category/card";
import { apiKey } from "../../config";

const Home = () => {
  const [activities, setActivities] = useState([])
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);  
  const [banners, setBanners] = useState([]);
  const getActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        },
      });
  
      const allActivities = response.data.data;
      const sortedActivities = allActivities.sort((a, b) => b.total_reviews - a.total_reviews);
      const top8Activities = sortedActivities.slice(0, 8);
  
      console.log(top8Activities);
      setActivities(top8Activities);
      
    } catch (error) {
      console.error("Failed to fetch activities data: ", error)
    }
  };

    const getBanners = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get('/banners', {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      console.log('Banners ',response.data.data)
      setBanners(response.data.data)
    } catch (error) {
      console.error("Failed to fetch banners: ", error)
    }
  }
  const getDeals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/promos", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey
        },
      });
  
      const allDeals = response.data.data;
      const sortedDeals = allDeals.sort((a, b) => b.promo_discounted_price - a.promo_discounted_price);
      const top3Deals = sortedDeals.slice(0, 3);
  
      console.log(top3Deals);
      setDeals(top3Deals);
      
    } catch (error) {
      console.error("Failed to fetch deals data: ", error)
    }
  };

  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        },
      });

      setCategories(response.data.data);
      
    } catch (error) {
      console.error("Failed to fetch categories data: ", error)
    }
  };

  useEffect(() => {
      getActivities(),
      getDeals(),
      getCategories(),
      getBanners()
  }, [])
  
  return (
    <>
      <Header />
      
      <div className="min-h-screen p-2 pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
        {/* Banner */}
<section
  className="relative w-full h-[450px] bg-cover bg-center p-4 mt-2"
  style={{
    backgroundImage: banners[0]?.imageUrl ? `url(${banners[0].imageUrl})` : 'none',
  }}
>
  <div className="absolute inset-0 bg-black/50 rounded-2xl">
    <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
      <h1 className="text-3xl font-bold text-white md:text-5xl">
        Explore the World via Tripvia
      </h1>
      <p className="max-w-2xl mt-4 text-white text-md md:text-lg">
        Discover new destinations, plan your trips, and make unforgettable memories with Tripvia.
      </p>
    </div>
  </div>
</section>


        <div className="container px-4 py-10 mx-auto space-y-16">

          {/* Activities / Places List */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Top Activities</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
              <ActivityCard activities={activities} />
            </div>
          </section>

          {/* Deals / Coupons */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Exclusive Deals</h2>
            <DealCard deals={ deals } />
          </section>

          {/* Categories */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Explore by Category</h2>
            <CategoryCard categories={ categories } />
          </section>

        </div>
      </div>
      
      <Footer/>
    </>

  );
};

export default Home;
