"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { type FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { login, lookForASession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // The path to redirect to after login. Get it from the router's state
  // or default to the dashboard if the user lands on /login directly.
  const from = location.state?.from?.pathname || "/dashboard";

  // If the user is already authenticated, redirect them away from the login page.
  useEffect(() => {
    lookForASession().then((isAuthenticated) => {
      if (isAuthenticated) {
        navigate(from, { replace: true });
      }
    });
  }, [lookForASession, navigate, from]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    if (!userName || userName.trim() === "") {
      console.error("Username is required for login.");
      return;
    }
    await login({
      userName: userName,
      password: password, // Default password if not provided
    }).catch((error) => {
      console.error("Login failed:", error);
    });
    navigate(from, { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-600"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any username"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1 text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
// This code defines a simple login page using React and Tailwind CSS.
// It includes a form with fields for username and password, and a submit button.
// The page is styled to be centered and responsive, with a clean layout.