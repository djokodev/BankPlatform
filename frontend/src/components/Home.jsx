import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateToken } from '../utils/auth';


const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <nav className="flex justify-between items-center p-4 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">SwiftPay</div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Banking Made Simple, Secure and Fast 
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl">
          Experience modern banking with cutting-edge technology and unparalleled security
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 p-16 bg-gray-50">
        <div className="text-center p-6 hover:shadow-lg transition rounded-lg">
          <div className="mx-auto mb-4 text-blue-600 text-5xl">🛡️</div>
          <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
          <p className="text-gray-600">Advanced encryption and multi-factor authentication</p>
        </div>
        <div className="text-center p-6 hover:shadow-lg transition rounded-lg">
          <div className="mx-auto mb-4 text-blue-600 text-5xl">🕰️</div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Always available customer service team</p>
        </div>
        <div className="text-center p-6 hover:shadow-lg transition rounded-lg">
          <div className="mx-auto mb-4 text-blue-600 text-5xl">💳</div>
          <h3 className="text-xl font-semibold mb-2">Quick Transfers</h3>
          <p className="text-gray-600">Instant money transfers across accounts</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
          <div>
            <p>© 2024 SwiftPay. All Rights Reserved.</p>
            <p className="mt-2 text-sm text-gray-400">Safe, reliable and fast banking services</p>
          </div>
      </footer>
    </div>
  );
};

export default Home;