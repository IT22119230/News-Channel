import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, singInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuthenticate from "../components/OAuthenticate";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
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
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-slate-700 block mb-1">
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full px-3 py-2 border rounded-md"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-slate-700 block mb-1">
                Your password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-2 right-3 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.895-.639 1.73-1.092 2.493m-2.027 2.63C16.547 18.26 14.398 19 12 19c-2.398 0-4.547-.74-6.423-2.877M4.03 14.493C3.09 13.267 2.348 11.711 2.02 10"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.98 8.493C4.92 7.267 6.4 6 12 6s7.08 1.267 8.02 2.493M12 18a9 9 0 018.72-6.752M12 18a9 9 0 01-8.72-6.752"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button className="bg-blue-600 w-3/4" disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
                <OAuthenticate/>
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
