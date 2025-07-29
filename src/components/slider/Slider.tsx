"use client";

import { useCallback, useState } from "react";
import styles from "./slider.module.css";

interface SlideItem {
  image: string;
  alt: string;
}

/**
 * Slider component that displays a focused item with a background image.
 * @returns {JSX.Element} - Returns the slider JSX.
 */
export default function Slide({
  setBackgroundImage,
}: {
  setBackgroundImage: (image: string) => void;
}) {
  const [items, setItems] = useState<SlideItem[]>([
    { image: "src/assets/images/planets/mercury.png", alt: "Mercury" },
    { image: "src/assets/images/planets/venus.png", alt: "Venus" },
    { image: "src/assets/images/planets/earth.png", alt: "Earth" },
    { image: "src/assets/images/planets/mars.png", alt: "Mars" },
    { image: "src/assets/images/planets/jupiter.png", alt: "Jupiter" },
    { image: "src/assets/images/planets/saturn.png", alt: "Saturn" },
    { image: "src/assets/images/planets/neptune.png", alt: "Neptune" },
    { image: "src/assets/images/planets/uranus.png", alt: "Uranus" },
  ]);

  const updateStack = useCallback(({ index }: { index: number }) => {
    const item = items.at(index);
    items.splice(index, 1);
    items.push(item!);
    setItems(items);
  }, []);

  return (
    <div>
      <ul className={styles.slideContainer}>
        {items.map((item, index) => (
          <li key={index}>
            <div
              className={`${styles.item}`}
              style={{ backgroundImage: `url(${item.image})` }}
              onClick={() => {
                setBackgroundImage(item.image);
                updateStack({ index });
              }}
              title={item.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
