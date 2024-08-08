import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent entire page form loading when form is submitted.
    setLoading(true);
    setErrors(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // This is for security purposes.
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        navigate("/sign-in");
      } else {
        const errorData = await res.json(); // Assuming your backend sends error details
        setErrors(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-md mx-auto rounded-lg shadow-lg mt-6 ">
      <h1 className="text-3xl text-center font-semibold my-7">SignUp</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg  
        uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
        {errors && <p className="text-red-500 text-center">{errors}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
