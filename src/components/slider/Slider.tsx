import { useState } from "react";
import styles from "./slider.module.css";

interface SlideItem {
  image: string;
  alt: string;
}

export function SliderItem({
  image,
  alt,
  setBackgroundImage,
}: SlideItem & { setBackgroundImage: (image: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`${styles.item} ${isFocused ? styles.focused : ""}`}
      onClick={() => {
        setIsFocused(!isFocused);
        setBackgroundImage(image);
      }}
    >
      <div className={styles.item}>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
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
  const items: SlideItem[] = [
    { image: "src/assets/images/planets/mercury.png", alt: "Mercury" },
    { image: "src/assets/images/planets/venus.png", alt: "Venus" },
    { image: "src/assets/images/planets/earth.png", alt: "Earth" },
    { image: "src/assets/images/planets/mars.png", alt: "Mars" },
    { image: "src/assets/images/planets/jupiter.png", alt: "Jupiter" },
    { image: "src/assets/images/planets/saturn.png", alt: "Saturn" },
    { image: "src/assets/images/planets/neptune.png", alt: "Neptune" },
    { image: "src/assets/images/planets/uranus.png", alt: "Uranus" },
  ];

  return (
    <div className={styles.slideContainer}>
      <div className={styles.slide}>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <SliderItem
                image={item.image}
                alt={item.alt}
                setBackgroundImage={setBackgroundImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
