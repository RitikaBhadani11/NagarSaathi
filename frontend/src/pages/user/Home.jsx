// src/pages/Home.jsx
import { FaQuoteLeft, FaHandsHelping, FaRecycle, FaUsers } from 'react-icons/fa';
import { GiTreeGrowth } from 'react-icons/gi';
import Navbar from './Navbar'; // Updated import path

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Clean neighborhood"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="text-white max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
              Together for a Cleaner Tomorrow
            </h1>
            <p className="text-xl md:text-2xl italic font-light">
              "Keeping our surroundings clean is not an option - it's our responsibility"
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Our Mission & Vision</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FaHandsHelping className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To empower communities to maintain clean, safe, and sustainable neighborhoods 
                through collaborative reporting, awareness, and civic engagement.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <GiTreeGrowth className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                A world where every citizen actively participates in creating and maintaining 
                pristine living environments that foster health, happiness, and community pride.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="space-y-6">
              <div className="flex items-start">
                <FaQuoteLeft className="text-yellow-400 text-2xl mr-4 mt-1" />
                <p className="text-lg italic text-gray-700">
                  "We won't have a society if we destroy the environment."
                  <span className="block font-medium mt-2">- Margaret Mead</span>
                </p>
              </div>

              <div className="flex items-start">
                <FaQuoteLeft className="text-green-400 text-2xl mr-4 mt-1" />
                <p className="text-lg italic text-gray-700">
                  "Cleanliness is next to godliness."
                  <span className="block font-medium mt-2">- John Wesley</span>
                </p>
              </div>

              <div className="flex items-start">
                <FaQuoteLeft className="text-blue-400 text-2xl mr-4 mt-1" />
                <p className="text-lg italic text-gray-700">
                  "The environment is where we all meet; where all have a mutual interest."
                  <span className="block font-medium mt-2">- Lady Bird Johnson</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaRecycle className="text-4xl mb-4" />,
                title: "Sustainability",
                desc: "Promoting eco-friendly solutions for long-term community health"
              },
              {
                icon: <FaUsers className="text-4xl mb-4" />,
                title: "Community",
                desc: "Strengthening bonds through collective environmental action"
              },
              {
                icon: <FaHandsHelping className="text-4xl mb-4" />,
                title: "Responsibility",
                desc: "Encouraging personal accountability for shared spaces"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors">
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Join the Movement</h2>
          <p className="text-gray-600 mb-6">
            Be part of the solution! Report issues in your neighborhood and help us create cleaner, safer communities.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;