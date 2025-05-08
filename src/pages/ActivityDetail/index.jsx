// src/pages/ActivityDetail/index.jsx

import { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaClock, FaCheckCircle, FaHome } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { NavLink, useParams } from 'react-router-dom';
import Api from '../../utils/Api';
import { apiKey } from '../../config'
import { FaLocationDot, FaUmbrellaBeach } from 'react-icons/fa6';
import '../ActivityDetail/style.css'
import { toast, ToastContainer } from 'react-toastify';
import FallbackImage from '../../utils/FallbackImage';

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState([]);

  const getActivityDetails = async () => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await Api.get(`/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
          apiKey: apiKey,
        },
      });
      console.log('ACTIVITY DETAIL', response.data.data);
      setActivity(response.data.data);  
    }  catch (error) {
      console.error("Failed to fetch activity data: ", error);
    } finally {
      setIsLoading(false);
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

  const addToCart = async (activityId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Api.post(
        "add-cart",
        { activityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKey,
          },
        }
      );

      toast.success("Successfully added item to cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      window.dispatchEvent(new Event("cartUpdated"));
      
      console.log("added cart response:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  useEffect(() => {
    getActivityDetails();
    getBanners();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      <ToastContainer/>
       {/* Banner */}
       <div
          className="relative w-full h-[400px] bg-cover bg-center  mt-20 p-8 rounded-2xl mt-22 "
          style={{
            backgroundImage:
              `url(${banners[0].imageUrl})`
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-2xl" />
          <div className="absolute text-white bottom-6 left-6">
            <h1 className="text-3xl font-bold">{activity.title}</h1>
            <p className="flex items-center mt-2 text-sm">
              <FaMapMarkerAlt className="mr-2" /> {activity.city}, {activity.province}
            </p>
          </div>
        </div>
      <div className="max-w-6xl px-4 py-5 mx-auto mt-6 space-y-8">   
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
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
                <FaUmbrellaBeach
                  className="w-3 h-3 mx-2 text-gray-400"
                />
                <span className="text-gray-500">Escapes</span>
              </div>
            </li>
          </ol>
        </nav>          
        {/* Image Gallery */}
        {activity.imageUrls && activity.imageUrls.length > 0 && (
          <div className="flex gap-4 overflow-x-auto">
            {activity.imageUrls.map((img, idx) => (
              <FallbackImage
                key={idx}
                src={img}
                onClick={() => setSelectedImage(idx)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === idx ? "border-blue-500" : "border-transparent"
                }`}
                alt={`Gallery image ${idx}`}
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-3">
          {/* Details Section */}
          <div className="space-y-6 md:col-span-2">
            {/* About */}
            <div className='p-6 pt-3 mt-8 space-y-4 bg-white shadow-lg rounded-2xl'>
              <h2 className="mb-2 text-2xl font-bold text-gray-700">About { activity.title }</h2>
              <p className="text-sm text-gray-500">{activity.description}</p>
              
              <hr className="my-4 border-t border-gray-300" />
              
              <h2 className="mb-2 text-2xl font-bold text-gray-700"> What's Waiting For You</h2>
              <div className="space-y-1 text-sm text-gray-600">
              {activity.facilities &&
                activity.facilities.split(',').map((item, index) => (
                  <label key={index} className="flex items-center space-x-2 leading-tight">
                    <input type="checkbox" checked readOnly className="accent-blue-600" />
                    <span>{item.trim()}</span>
                  </label>
                ))}
            </div>
            </div>

            {/* Location Map */}
            {activity.location_maps && (
              <div className="p-6 mt-8 space-y-4 bg-white shadow-md rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-700"> Location</h2>
                <p className='flex items-center space-x-2 text-sm text-gray-500'>
                  <FaLocationDot/>
                  <span>
                    {activity.address}
                  </span>
                </p>
                <div
                  className="p-4 overflow-hidden border border-gray-200 shadow-sm rounded-xl aspect-video iframe-wrapper"
                  dangerouslySetInnerHTML={{ __html: activity.location_maps }}
                />
              </div>
            )}
            </div>

          <div className="sticky p-6 mb-6 space-y-3 bg-white shadow-2xl top-28 rounded-2xl h-fit">            
            <div className="transition group hover:text-blue-600">
              <p className='text-sm text-gray-500'>Price</p>
              <div className="flex items-center space-x-2 font-bold text-blue-600">
                <p>${activity.price}</p>
                {activity.price_discount > 0 && (
                  <p className="text-sm font-normal text-gray-400 line-through">
                    ${activity.price_discount}
                  </p>
                )}
              </div>
            </div>

            <div className="transition group hover:text-blue-600">
              <p className='text-sm text-gray-500'>Rating</p>
              <div className="flex items-center space-x-1 font-bold text-blue-600">
                <FaStar className="text-yellow-400" />
                <p>{activity.rating}</p>
                <span className="font-normal text-gray-500">({activity.total_reviews} reviews)</span>
              </div>
            </div>


            <div className="space-y-2 text-sm text-gray-500">
              <div className="transition group hover:text-blue-600">
                <p>Category</p>
                <p className="font-bold text-blue-600">{activity.category.name}</p>
              </div>
              <div className="transition group hover:text-blue-600">
                <p className="flex items-center space-x-2">
                  <FaLocationDot className="text-gray-500" />
                  <span>Location</span>
                </p>
                <p className="font-bold text-blue-600 ">{activity.province}, {activity.city}</p>
              </div>
            </div>
            
            <hr className="my-4 border-t border-gray-300" />
            
            <div className='mt-5 space-y-1.5'>
              <button className="w-full px-4 py-2 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700">
                Book Now
              </button>
              
              <button
                className="w-full px-4 py-2 font-medium text-blue-600 transition-all bg-white border border-blue-600 rounded-lg hover:bg-blue-50"
                onClick={() => addToCart(activity.id)}
              >
                Add to Cart
              </button>
            </div>          
          </div>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default ActivityDetails;
