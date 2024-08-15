import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent entire page form loading when form is submitted.

    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // This is for security purposes.
      });

      const data = await res.json();
      console.log(data);
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
    <div className="p-3 max-w-md mx-auto rounded-lg shadow-lg mt-6 ">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Submitting..." : "Sign In"}
        </button>
        <OAuth />
        {errors && <p className="text-red-500 text-center">{errors}</p>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
