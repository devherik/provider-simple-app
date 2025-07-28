"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme.ts";
import Button from "../../components/button/Button.tsx";
import bg_img from "../../assets/images/bg-login-img.jpg";
import Form from "../../components/form/Form.tsx";
import NeonGlowAnimation from "../../animations/neon_glow/NeonGlowAnimation.tsx";
import FadeAnimation from "../../animations/fade_animation/FadeAnimation.tsx";
import ThemeToggle from "../../components/theme_toogle/ThemeToogle.tsx";
import styles from "./page.module.css";

export default function LoginPage() {
  const { login, lookForASession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { currentTheme } = useTheme();

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
      if (!password || password.trim() === "") {
        console.error("Password is required for login.");
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
    <FadeAnimation duration={0.5} direction="in">
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
              fontFamily: "var(--main-font)",
            }}
          >
            Where in Space?
          </span>
        </NeonGlowAnimation>

        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "#fffcff",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <ThemeToggle />
        </div>

        <FadeAnimation duration={1} direction="in">
          <div
            className={`flex flex-col items-center justify-center h-screen bg-cover bg-center`}
          >
            <div
              className={`${styles.glass_card} flex flex-col items-center justify-center p-8`}
            >
              <h1
                style={{
                  color: currentTheme.colors.text,
                  fontSize: currentTheme.fontSizes.large,
                  fontWeight: "bold",
                  textAlign: "start",
                  marginBottom: "20px",
                }}
              >
                Sign in
              </h1>
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
                <Button
                  children={
                    <div className="flex items-center justify-center gap-2">
                      <p>Login</p>
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={"src/assets/icons/arrow-right-dk.svg"}
                        alt="arrow right icon"
                      />
                    </div>
                  }
                  onClick={handleLogin}
                />
              </form>
            </div>
          </div>
        </FadeAnimation>
      </div>
    </FadeAnimation>
  );
}
