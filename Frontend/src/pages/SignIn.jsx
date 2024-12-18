import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, singInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function SignIn() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate for redirection
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        dispatch(singInFailure("Please fill all fields"));
        return;
    }
    try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                photo: formData.profilePicture,
            }),
        });

        const data = await res.json();
        if (data.success === false) {
            dispatch(singInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
    } catch (error) {
        dispatch(singInFailure(error.message));
    }
}

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Sign In to Your Account
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
