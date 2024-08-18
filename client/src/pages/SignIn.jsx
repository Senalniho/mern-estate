import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <OAuth className="w-full" />
      </form>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <p className="text-gray-600">Don't have an account?</p>
        <Link to="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
