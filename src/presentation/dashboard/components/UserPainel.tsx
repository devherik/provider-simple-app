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
          <header className="flex items-center justify-center gap-4">
            <div className="flex">
              <img
                src="src/assets/images/user.png"
                alt="User Avatar"
                className="w-14 h-14 rounded-full col-2"
              />
              <div className="ml-2">
                <h2 className="text-lg font-bold text-[var(--text-color)] col-auto">
                  Welcome, {user}!
                </h2>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main className="mt-4">
            <p className="text-sm text-[var(--text-color)]">
              Here you can manage your account settings.
            </p>
          </main>
          <footer className="mt-4 flex align-center justify-end">
            <p style={{ width: "auto" }}>
              <Button onClick={onLogout}>Logout</Button>
            </p>
          </footer>
        </div>
      </Modal>
    </>
  );
}
