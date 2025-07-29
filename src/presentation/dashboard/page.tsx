"use client";

import { useAuth } from "../../hooks/useAuth";
import styles from "./page.module.css";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";
import UserPainel from "./components/UserPainel";
import Slide from "../../components/slider/Slider";
import { useState } from "react";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState(
    "src/assets/images/planets/earth.png"
  );

  return (
    <EnterAnimation duration={0.5}>
      <div
        className={styles.dashboardContainer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <header className={styles.header}>
          <UserPainel user={currentUser!} onLogout={logout} />
        </header>
        <main className={`${styles.mainContent} columns-2`}>
          <div className="aspect-auto">Ola</div>
          <aside className="aspect-3/2">
            <Slide setBackgroundImage={setBackgroundImage} />
          </aside>
        </main>
      </div>
    </EnterAnimation>
  );
}
