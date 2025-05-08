import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { apiKey } from "../../config";
import Api from "../../utils/Api";
import ActivityCard from "../../components/Activity/card";
import { FaUmbrellaBeach } from 'react-icons/fa6';
import FallbackImage from "../../utils/FallbackImage";
import Breadcrumb from "../../components/BreadCrumb";
import { FaSearch } from "react-icons/fa";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [allActivities, setAllActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const getAllActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await Api.get("/activities", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKey,
        },
      });
      setActivities(res.data.data);
      setAllActivities(res.data.data);
    } catch (error) {
      console.error("Failed to fetch all activities: ", error);
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  useEffect(() => {
    getCategories();
    getAllActivities();
  }, []);
  
  useEffect(() => {
    if (activeTab && activeTab !== "all") {
      getActivitiesByCategory(activeTab);
    } else {
      setActivities(allActivities);
    }
  }, [activeTab]);

  return (
    <>
      <Header />
      <Breadcrumb menu="Escapes" />
      <div className="min-h-screen p-10 mt-0 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="mb-1 text-3xl font-bold text-black">Perfect Escapes</h2>
            <p className="mb-8 text-gray-500 text-md">Discover exclusive travel experiences handpicked for your perfect escape</p>
          </div>
                
          {/* search input */}
          <div className="flex justify-end">            
            <div className="flex items-center w-full h-12 px-4 py-2 mb-6 border border-gray-400 rounded-lg shadow-sm focus-within:ring-1 focus-within:ring-blue-600">
              <FaSearch className="mr-2 text-gray-300" />
              <input
                type="text"
                placeholder="Search escapes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full focus:outline-none"
              />
            </div>
          </div>    
        </div>
        
        <section id="travel-escapes" className="grid grid-cols-1 mt-0 overflow-hidden shadow-lg bg-gray-50 md:grid-cols-3 rounded-xl">      
          <div className="col-span-1 p-3 bg-center bg-cover bg-blue-50">
            <div className="flex overflow-x-auto text-xs font-medium text-blue-600 border-blue-700 rounded-md whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-600/60 scrollbar-track-transparent">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 px-3 py-2 border border-blue-700 tablinks hover:bg-blue-600 hover:text-white ${activeTab === "all" ? 'bg-blue-600 text-white' : ''}`}
              >
                All
              </button>             
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex-1 px-3 py-2 border border-blue-700 tablinks hover:bg-blue-600 hover:text-white ${activeTab === category.id ? 'bg-blue-600 text-white' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="relative grid grid-cols-2 gap-4 mt-4 overflow-hidden text-sm">
              {categories && activeTab && (
              <div className="col-span-2 mb-4">
                <img 
                    src={
                      categories.find((category) => category.id === activeTab)?.imageUrl?.startsWith('http')
                        ? categories.find((category) => category.id === activeTab).imageUrl
                        : "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2021/12/08/9c6ae660-1799-4276-b81d-f8b0b85669d6-1638949473006-1e6c55a1b1edca6bf250012af2cc79e2.jpg"
                    }                  
                    alt="Category" 
                    className="object-cover w-full h-48 transition-transform duration-300 rounded-lg shadow-lg hover:scale-105"
                  />                    
              <div className="absolute px-3 py-1 font-medium text-blue-600 bg-white border border-blue-600 border-dashed rounded-full shadow-md text-md top-2 left-2">
                {categories.find((category) => category.id === activeTab)?.name}
              </div>      
              </div>
            
              )}
            
              {filteredActivities.map((item, index) => (
                <div key={index} className="p-4 font-medium text-blue-600 border-dotted border-b-1 border-b-blue-400">
                  <div className="flex gap-2">
                    <span className="flex"><FaUmbrellaBeach className="mr-2"/>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
        </div>

            <div className="col-span-2 p-4">
              <div className="grid grid-cols-1 gap-4 mt-4 text-sm sm:grid-cols-2 md:grid-cols-3">
                <ActivityCard activities={filteredActivities} />
              </div>
            </div>
        </section>
      </div>

      <Footer/>
    </>

  );
}

  
export default Activities;