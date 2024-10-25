import React from "react";
import { FaBook, FaUserAlt, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 animate-fadeInDown">
        Welcome to the Library Management System
      </h1>

      <p className="text-lg text-gray-700 mb-10 text-center max-w-md animate-fadeInUp">
        Discover a world of knowledge, track your book assignments, and manage
        your library account with ease. This system helps you keep tabs on due
        dates, assigned books, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-3xl mb-10">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <FaBook className="text-blue-600 text-5xl mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Books</h2>
          <p className="text-gray-600">
            Browse, assign, and track books with ease. Access a wide range of
            titles at your fingertips.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <FaUserAlt className="text-green-600 text-5xl mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Users</h2>
          <p className="text-gray-600">
            Manage user accounts, track assigned books, and view user
            information securely.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <FaCalendarCheck className="text-orange-500 text-5xl mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Due Dates
          </h2>
          <p className="text-gray-600">
            Stay informed of all upcoming due dates to keep your books on time
            and avoid late fees.
          </p>
        </div>
      </div>

      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default Home;
