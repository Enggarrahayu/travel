import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { apiKey } from "../../config";
import Api from "../../utils/Api";
import ActivityCard from "../../components/Activity/card";
import { FaUmbrellaBeach } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import FallbackImage from "../../utils/FallbackImage";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const categoryRes = await Api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
  
      const categoryList = categoryRes.data.data;
      const activityRequests = await Promise.all(
        categoryList.map((cat) =>
          Api.get(`/activities-by-category/${cat.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: apiKey,
            },
          }).then(res => ({ ...cat, activities: res.data.data }))
        )
      );
  
      const unemptyCategories = activityRequests.filter(cat => cat.activities.length > 0);
  
      setCategories(unemptyCategories);
  
      // Set the first valid category as active by default
      if (unemptyCategories.length > 0) {
        setActiveTab(unemptyCategories[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch categories or activities: ", error);
    }
  };
  
  const getActivitiesByCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.get(`/activities-by-category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      setActivities(response.data.data);
    } catch (error) {
      console.error("Failed to fetch activity data: ", error);
    }
  };
  
  useEffect(() => {
    getCategories();
  }, []);
  
  useEffect(() => {
    if (activeTab) {
      getActivitiesByCategory(activeTab);
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <nav className="px-8 text-sm text-gray-600 mt-28 " aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <NavLink to="/" className="inline-flex items-center hover:text-blue-600">
                <FaHome className='w-3 h-3 mx-2 text-gray-400'/>
                Home
              </NavLink>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 6 10"
                >
                  <path d="M1 1L5 5L1 9" />
                </svg>
                <span className="text-gray-500">Escapes</span>
              </div>
            </li>
          </ol>
      </nav>  
      
      <section id="travel-escapes" className="grid grid-cols-1 p-8 mt-0 overflow-hidden bg-white shadow-lg md:grid-cols-3 rounded-xl">
      <div className="col-span-1 p-3 bg-center bg-cover bg-blue-50">
          <div className="flex overflow-x-auto text-xs font-medium text-blue-600 whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-600/60 scrollbar-track-transparent">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex-1 px-3 py-2 border border-blue-600 tablinks hover:bg-blue-600 hover:text-white ${activeTab === category.id ? 'bg-blue-600 text-white' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative grid grid-cols-2 gap-4 mt-4 overflow-hidden text-sm">
            {categories && activeTab && (
            <div className="col-span-2 mb-4">
            <FallbackImage 
              src={categories.find((category) => category.id === activeTab)?.imageUrl} 
              alt="Category" 
              className="object-cover w-full h-48 transition-transform duration-300 rounded-lg shadow-lg hover:scale-105"
                  />
                  
            <div className="absolute px-3 py-1 font-medium text-blue-600 bg-white border border-blue-600 border-dashed rounded-full shadow-md text-md top-2 left-2">
              {categories.find((category) => category.id === activeTab)?.name}
            </div>      
            </div>
          
            )}
          
            {activities.map((item, index) => (
              <div key={index} className="p-4 font-medium text-blue-600 border-dotted border-b-1 border-b-blue-400">
                <div className="flex gap-2">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>
      </div>

          <div className="col-span-2 p-4">
            <div className="grid grid-cols-1 gap-4 mt-4 text-sm sm:grid-cols-2 md:grid-cols-3">
              <ActivityCard activities={activities} />
            </div>
          </div>
      </section>
      <Footer/>
    </>

  );
}

  
export default Activities;