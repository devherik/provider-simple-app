import { useState } from "react";
import styles from "./slider.module.css";

export default function Slide() {
  const [onFocus, setOnFocus] = useState(false);
  return (
    <div className={styles.slideContainer}>
      <div className={styles.slide}>
        <div>
          <button onClick={() => setOnFocus(!onFocus)}>
            <img
              className={`${styles.item} ${onFocus ? styles.focused : ""}`}
              src="src/assets/images/planets/earth.png"
              alt="Earth"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
