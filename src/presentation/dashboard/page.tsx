"use client";

import { useAuth } from "../../hooks/useAuth";
import styles from "./page.module.css";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";
import UserPainel from "./components/UserPainel";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();

  return (
    <EnterAnimation duration={0.5}>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={`flex-col justify-center items-center`}>
            <UserPainel user={currentUser!} onLogout={logout} />
          </div>
        </header>
        <main className={`${styles.mainContent}`}></main>
      </div>
    </EnterAnimation>
  );
}
