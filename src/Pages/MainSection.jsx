import React from "react";
import heroImage from "../assets/mainsection.png";
import logo from "../assets/m.jpeg";

const MainSection = () => {
  return (
    <section className="bg-white px-6 md:px-20 py-16">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-orange-500 to-blue-700 text-transparent bg-clip-text">
            Margdarshak’s Four Key Components
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Margdarshak offers four powerful solutions:{" "}
            <span className="font-bold text-gray-800">
              Verified Data, Unified Communication, Digital Tools, and Service
              Mart.
            </span>
            These tools guide businesses towards growth and efficiency.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Hero Illustration"
            className="w-full h-auto object-cover rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature Cards */}
        {[
          { title: "✅ Verified Data", desc: "Millions of verified, curated data filtered based on your business needs." },
          { title: "✅ Unified Communication", desc: "Communicate securely with customers via WhatsApp, Email, Call, or Virtual Meetings." },
          { title: "✅ Digital Tools", desc: "Manage business branding, sales, and other digital tasks effectively with our smart tools." },
          { title: "✅ Service Mart", desc: "Offer products, solutions, and services to expand your network and customer base." },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md transition-all transform hover:-translate-y-3 hover:shadow-2xl border-t-4 border-blue-500"
          >
            <h3 className="font-bold text-xl mb-2 text-blue-600">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-700 to-blue-700 text-transparent bg-clip-text">
          What Our Clients Say
        </h2>
        <div className="h-1 w-24 bg-blue-500 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Cards */}
          {[
            "Margdarshak has transformed our customer engagement strategy, providing a secure and reliable platform for our team.",
            "The verified data feature of Margdarshak has significantly improved our sales outreach efforts, allowing us to target the right customers.",
            "Margdarshak has been a game-changer for our business. The verified data and secure communication system have significantly improved our operations and customer satisfaction.",
            "I've tried other CRMs, but none have matched the data quality and security level provided by Margdarshak. It's a reliable and trustworthy solution.",
            "The verified data has significantly improved the quality of our leads, resulting in increased sales and customer satisfaction.",
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md transition-all transform hover:-translate-y-3 hover:shadow-2xl border-t-4 border-blue-500"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={logo}
                  alt="Client Logo"
                  className="h-16 w-16 object-cover rounded-full shadow-md"
                />
              </div>
              <p className="text-gray-700 italic leading-relaxed text-center">
                "{testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
