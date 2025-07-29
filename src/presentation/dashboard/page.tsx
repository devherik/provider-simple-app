"use client";

import { useAuth } from "../../hooks/useAuth";
import styles from "./page.module.css";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";
import UserPainel from "./components/UserPainel";
import Slide from "../../components/slider/Slider";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

  return (
    <EnterAnimation duration={0.5}>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <UserPainel user={currentUser!} onLogout={logout} />
        </header>
        <main className={`${styles.mainContent}`}>
          <Slide />
        </main>
      </div>
    </EnterAnimation>
  );
}
