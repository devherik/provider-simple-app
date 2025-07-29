import { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import styles from "../components/components.module.css";
import ThemeToggle from "../../../components/theme_toogle/ThemeToogle";

export default function UserPainel({
  user,
  onLogout,
}: {
  user: string;
  onLogout: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.userButton} onClick={() => setIsOpen(true)}>
        <img
          src="src/assets/images/user.png"
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="top-right"
      >
        <div className={styles.modalContent}>
          <header className="flex items-center justify-around">
            <img
              src="src/assets/images/user.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-2">
              <h2 className="text-lg font-bold text-[var(--text-color)]">Menu</h2>
              <p className="text-sm text-[var(--text-color)]">Welcome, {user}!</p>
            </div>
            <ThemeToggle />
          </header>
          <main className="mt-4">
            <p className="text-sm text-[var(--text-color)]">
              Here you can manage your account settings.
            </p>
          </main>
          <footer className="mt-4 align-center justify-center">
            <ul>
              <li style={{ width: "200px" }}>
                <Button onClick={onLogout}>Logout</Button>
              </li>
            </ul>
          </footer>
        </div>
      </Modal>
    </>
  );
}
