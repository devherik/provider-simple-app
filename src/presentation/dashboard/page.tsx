"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard Page</h1>
      <p className="text-lg">Welcome to the dashboard, {currentUser}!</p>
      <p className="text-sm text-gray-600 mt-2">
        This is a protected route, accessible only to authenticated users.
      </p>
    </div>
  );
}
// This code defines a simple dashboard page using React and Tailwind CSS.
// It includes a heading and a welcome message, styled to be centered and responsive.
// The page is designed to be a protected route, accessible only to authenticated users.