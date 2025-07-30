"use client";

import { useAuth } from "../../hooks/useAuth";
import styles from "./page.module.css";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";
import UserPainel from "./components/UserPainel";
import Slide from "../../components/slider/Slider";
import { useState } from "react";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState("");

  return (
    <EnterAnimation duration={0.5}>
      <div
        className={styles.dashboardContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <header className={styles.header}>
          <UserPainel user={currentUser!} onLogout={logout} />
        </header>
        <main className={`${styles.mainContent}`}>
          <Slide setBackgroundImage={setBackgroundImage} />
        </main>
      </div>
    </EnterAnimation>
  );
}
