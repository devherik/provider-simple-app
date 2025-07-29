"use client";

import { useAuth } from "../../hooks/useAuth";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";
import Button from "../../components/button/Button";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

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
          <div style={{ flexGrow: 1, maxWidth: "200px" }}>
            <Button children={<p>Logout</p>} onClick={logout} />
          </div>
        </header>
        <main></main>
      </div>
    </EnterAnimation>
  );
}
