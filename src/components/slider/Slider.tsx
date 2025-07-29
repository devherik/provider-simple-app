"use client";

import { useCallback, useState, useRef } from "react";
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

  const containerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateStack = useCallback(({ index }: { index: number }) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const item = newItems.splice(index, 1)[0];
      newItems.push(item);
      return newItems;
    });
  }, []);

  // Handle mouse events for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false); // Reset drag state
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    setHasDragged(true); // Mark that we've actually dragged
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    console.log("Mouse up");
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleItemClick = useCallback((item: SlideItem, index: number) => {
    console.log("Item clicked:", item, index, "hasDragged:", hasDragged);
    if (!hasDragged) { // Only trigger click if we haven't dragged
      setBackgroundImage(item.image);
      updateStack({ index });
    }
  }, [hasDragged, setBackgroundImage, updateStack]);

  return (
    <div>
      <ul 
        ref={containerRef}
        className={`${styles.slideContainer} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <li 
            key={`${item.alt}-${index}`}
          >
            <div
              className={`${styles.item}`}
              style={{ backgroundImage: `url(${item.image})` }}
              onClick={() => handleItemClick(item, index)}
              title={item.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
