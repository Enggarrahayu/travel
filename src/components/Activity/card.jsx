import { Link } from "react-router-dom";
import FallbackImage from "../../utils/FallbackImage";

const ActivityCard = ({ activities }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
    {activities.map((item, index) => (
      <div
        key={index}
        className="flex flex-col overflow-hidden transition-transform duration-300 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] dark:bg-gray-800"
      >
        {/* Image Section */}
        <div className="relative w-full h-48 overflow-hidden">
        <FallbackImage
          src={item.imageUrls && item.imageUrls[0]}
          alt="Activity"
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
          {/* Location badge */}
          <div className="absolute px-3 py-1 text-xs text-white bg-blue-500 rounded-full shadow-md top-2 left-2">
            {item.city}, {item.province}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            { item.title }
          </h3>

          {/* Rating */}
          <div className="flex items-center mt-2 space-x-1 text-yellow-400">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.466 1.287 3.974c.3.921-.755 1.688-1.539 1.117L10 13.347l-3.369 2.521c-.784.571-1.838-.196-1.539-1.117l1.287-3.974-3.39-2.466c-.783-.57-.38-1.81.588-1.81h4.184l1.286-3.974z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">{ item.rating }</span>
            <span className="ml-2 text-sm font-medium text-gray-500">({ item.total_reviews } reviews)</span>
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-blue-600">${item.price}</span>
            <Link to={`/activity/${item.id}`} className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700">View</Link>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
};

export default ActivityCard;
