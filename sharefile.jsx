import React, { useState } from "react";
import { FaPhone, FaStar } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import CsvDownloader from "react-csv-downloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GooglePlace = () => {
  const [keyword, setKeyword] = useState("");
  const [place, setPlace] = useState("");
  const [limit, setLimit] = useState(5);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState({});
  const [expandedRows, setExpandedRows] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://certc.in:4000/api/googleplacesapi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: `${keyword} in ${place}`,
            limit: limit,
          }),
        }
      );

      const result = await response.json();
      setData(result.data);

      toast.success(
        `Data fetched for "${keyword} in ${place}". Showing ${result.data.length} results.`,
        {
          className: " text-white",
        }
      );

      // Clear inputs after search
      setKeyword("");
      setPlace("");
      setLimit(5);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowMore = (index) => {
    setShowMore((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleRowReviews = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const csvData = data.map((hotel) => ({
    name: hotel.name ? hotel.name.replace(/,/g, "") : "No name", // Remove commas from name
    address: hotel.address ? hotel.address.replace(/,/g, "") : "No address",
    phone: hotel.phone !== "N/A" ? hotel.phone.replace(/,/g, "") : "No phone",
    rating: hotel.rating ? hotel.rating.toFixed(1) : "No rating",
    reviews:
      hotel.reviews && Array.isArray(hotel.reviews)
        ? hotel.reviews.map((r) => r.text.replace(/,/g, "")).join(" | ") // Remove commas from reviews
        : "No reviews",
  }));

  // CSV header configuration remains the same
  const csvHeaders = [
    { id: "name", displayName: "Name" },
    { id: "address", displayName: "Address" },
    { id: "phone", displayName: "Phone" },
    { id: "rating", displayName: "Rating" },
    { id: "reviews", displayName: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-col md:flex-col lg:flex-row items-start  p-8 space-y-8 lg:space-x-8 lg:space-y-0">
      {/* Toast Container */}
      <ToastContainer />

      {/* Left Form */}
      <div className="w-full lg:w-1/3 p-8 bg-white shadow-lg rounded-lg sticky top-8">
        <h1 className="text-2xl font-bold mb-6">Search Your Business Data</h1>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-left font-semibold">
            Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. hotels, school, Shopping mall, clinic, bank ..."
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-left font-semibold">
            Place
          </label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. Please Enter your desired location"
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 text-left font-semibold">
            Limit
          </label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Limit of results"
          />
        </div>
        <button
          onClick={fetchData}
          className="w-full p-3 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Right Data Display */}
      <div className="w-full lg:w-2/3 h-full">
        {data.length > 0 ? (
          <div>
            <div className="overflow-y-auto h-[70vh] bg-white shadow-lg rounded-lg p-4">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-300 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((hotel, index) => (
                    <React.Fragment key={index}>
                      <tr key={index} className="border-t-2">
                        <td className="p-3 text-left max-w-40">
                          {hotel.name.split(" ").slice(0, 4).join(" ")}
                          {hotel.name.split(" ").length > 3 && "..."}
                        </td>
                        <td className="p-3 max-w-xs text-left">
                          {showMore[index] || hotel.address.length <= 20 ? (
                            <span>{hotel.address}</span>
                          ) : (
                            <span>{hotel.address.slice(0, 30)}...</span>
                          )}
                          {hotel.address.length > 50 && (
                            <button
                              onClick={() => toggleShowMore(index)}
                              className="text-blue-500 ml-2"
                            >
                              {showMore[index] ? "View Less" : "View More"}
                            </button>
                          )}
                        </td>
                        <td className="p-3 flex items-center text-left mt-5 ">
                          <FaPhone className="mr-2 text-green-500 " />
                          {hotel.phone !== "N/A" ? hotel.phone : "No phone"}
                        </td>
                        <td className="p-3 flex-col-reverse">
                          <div className="flex">
                            <div className="mr-2 font-semibold">
                              {hotel.rating.toFixed(1)}
                            </div>
                            {[...Array(Math.round(hotel.rating))].map(
                              (_, i) => (
                                <FaStar
                                  key={i}
                                  className="text-green-500 mt-1"
                                />
                              )
                            )}
                          </div>
                        </td>
                        <td className="p-2 text-left">
                          <button
                            onClick={() => toggleRowReviews(index)}
                            className="text-blue-500 p-1 rounded-md hover:bg-blue-100"
                            style={{ border: "1px solid" }}
                          >
                            {expandedRows[index]
                              ? "Hide Reviews"
                              : "View Reviews"}
                          </button>
                        </td>
                      </tr>

                      {/* Show reviews for the selected row */}
                      {expandedRows[index] && hotel.reviews && (
                        <tr>
                          <td colSpan="5" className="p-4 bg-gray-100">
                            <h2 className="text-xl font-bold mb-4">
                              Reviews for {hotel.name}
                            </h2>
                            {hotel.reviews.length > 0 ? (
                              <ul className="space-y-4">
                                {hotel.reviews.map((review, idx) => (
                                  <li
                                    key={idx}
                                    className="p-4 bg-white shadow rounded-lg"
                                  >
                                    <div className="flex items-center mb-2">
                                      <CiUser className="w-5 h-5 rounded-full mr-2" />
                                      <span className="font-bold text-left">
                                        {review.author_name}
                                      </span>
                                    </div>
                                    <p className="text-left">{review.text}</p>
                                    <div className="text-gray-500 text-sm mt-2 text-left">
                                      {new Date(review.time).toLocaleString()}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p>No reviews available</p>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CSV Download Button */}
            <div className="my-4">
              <CsvDownloader
                filename={`${place}_${keyword}_data`}
                extension=".csv"
                separator=","
                wrapColumnChar=""
                datas={csvData}
                columns={csvHeaders}
              >
                <button className="p-3 bg-green-500 text-white rounded-md">
                  Download CSV
                </button>
              </CsvDownloader>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-lg text-center">
            No data available. Please search for a location.
          </div>
        )}
      </div>
    </div>
  );
};