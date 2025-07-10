"use client";

import { useAuth } from "../../hooks/useAuth";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard Page</h1>
      <p className="text-lg">Welcome to the dashboard, {currentUser}!</p>
      <p className="text-sm text-gray-600 mt-2">
        This is a protected route, accessible only to authenticated users.
      </p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition-colors" onClick={logout}>Sair</button>
    </div>
  );
}
// This code defines a simple dashboard page using React and Tailwind CSS.
// It includes a heading and a welcome message, styled to be centered and responsive.
// The page is designed to be a protected route, accessible only to authenticated users.