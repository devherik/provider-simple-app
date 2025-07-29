import { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import styles from "../components/components.module.css";

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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} position="top-right">
        <h2 className="text-lg font-bold">User Menu</h2>
        <p className="text-sm">Welcome, {user}!</p>
        <ul>
          <li>
            <Button onClick={onLogout}>Logout</Button>
          </li>
        </ul>
      </Modal>
    </>
  );
}
