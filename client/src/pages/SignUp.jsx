import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            id="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg uppercase font-semibold tracking-wide hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <OAuth className="w-full" />
      </form>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <p className="text-gray-600">Have an account?</p>
        <Link to="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
