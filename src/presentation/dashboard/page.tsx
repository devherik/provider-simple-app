"use client";

import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";

export default function DashboardPage() {
  const { currentUser, logout, lookForASession } = useAuth();
  const navigate = useNavigate();

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    lookForASession().then((isAuthenticated) => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    });
  }, [lookForASession, navigate]);

  return (
    <EnterAnimation duration={0.5}>
      <div
        style={{
          padding: "20px",
          width: "100vw",
          minWidth: "100%",
          maxWidth: "100%",
          height: "100vh",
          minHeight: "100%",
          maxHeight: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "unset",
          overflowY: "unset",
        }}
      >
        <header className="flex flex-row items-start justify-around h-full text-center">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg">Welcome to the dashboard, {currentUser}!</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={logout}
          >
            Sair
          </button>
        </header>
        <main></main>
      </div>
    </EnterAnimation>
  );
}
// This code defines a simple dashboard page using React and Tailwind CSS.
// It includes a heading and a welcome message, styled to be centered and responsive.
// The page is designed to be a protected route, accessible only to authenticated users.
