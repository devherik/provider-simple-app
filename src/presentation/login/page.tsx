"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/button/Button.tsx";
import bg_img from "../../assets/images/bg-login-img.jpg";
import Form from "../../components/form/Form.tsx";
import NeonGlowAnimation from "../../animations/neon_glow/NeonGlowAnimation.tsx";
import FadeAnimation from "../../animations/fade_animation/FadeAnimation.tsx";

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

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault(); // Prevent the form from causing a page reload
      if (!userName || userName.trim() === "") {
        console.error("Username is required for login.");
        return;
      }
      await login({
        userName: userName,
        password: password,
      })
        .then(() => {
          navigate(from, { replace: true });
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    },
    [login, userName, password, navigate, from]
  );

  return (
      <div
        style={{
          backgroundImage: `url(${bg_img})`,
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
        <NeonGlowAnimation>
          <span
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "#fffcff",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Where in Space?
          </span>
        </NeonGlowAnimation>

        <div
          className={`flex flex-col items-center justify-center h-screen bg-cover bg-center`}
        >
          <FadeAnimation duration={2} direction="in">
            <div
              className="p-8 bg-[#FFF8F0] rounded-lg shadow-md w-full max-w-sm"
            >
              <h1 className="text-2xl font-bold mb-4 text-start text-blue-950">
                Sign in
              </h1>
              {/* Add a select element here for planet selection and remove the forms */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Form
                    onChange={setUserName}
                    value={userName}
                    id="username"
                    type="text"
                    label="Username"
                  />
                </div>
                <div>
                  <Form
                    onChange={setPassword}
                    value={password}
                    id="password"
                    type="password"
                    label="Password"
                  />
                </div>
                <Button children="Login" onClick={handleLogin} />
              </form>
            </div>
          </FadeAnimation>
        </div>
      </div>
  );
}
// This code defines a simple login page using React and Tailwind CSS.
// It includes a form with fields for username and password, and a submit button.
// The page is styled to be centered and responsive, with a clean layout.
