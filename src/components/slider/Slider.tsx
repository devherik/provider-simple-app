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
  const itemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateStack = useCallback(({ index }: { index: number }) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const item = newItems.splice(index, 1)[0];
      newItems.push(item);
      return newItems;
    });
  }, []);

  // Handle mouse events for dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // Check if the click target is an item (not the container)
    const clickedItem = (e.target as HTMLElement).closest(`.${styles.item}`);

    if (clickedItem) {
      // Click was on an item - find which item it was
      const itemElements = containerRef.current.querySelectorAll(
        `.${styles.item}`
      );
      const itemIndex = Array.from(itemElements).indexOf(
        clickedItem as HTMLElement
      );

      if (itemIndex !== -1) {
        // Store the clicked item info for potential click handling
        setClickedItemIndex(itemIndex);
      }
    }

    // Always set up drag state
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();
      setHasDragged(true); // Mark that we've actually dragged
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleItemClick = useCallback(
    (item: SlideItem, index: number) => {
      setBackgroundImage(item.image);
      updateStack({ index });
    },
    [setBackgroundImage, updateStack]
  );

  const handleMouseUp = useCallback(() => {
    console.log("Mouse up");

    // If we didn't drag and we have a clicked item, handle the click
    if (!hasDragged && clickedItemIndex !== null) {
      const clickedItem = items[clickedItemIndex];
      if (clickedItem) {
        handleItemClick(clickedItem, clickedItemIndex);
      }
    }

    setIsDragging(false);
    setClickedItemIndex(null); // Reset clicked item
  }, [hasDragged, clickedItemIndex, items, handleItemClick]);

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

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Select a Planet</h2>
        <p className="text-gray-600 mb-4">
          Click or drag to select a planet. The selected planet will be set as
          the background image.
        </p>
        <p className="text-gray-600 mb-4">
          Dragging will cycle through the planets. Clicking on a planet will set
          it as the background image.
        </p>
      </div>
      <div className="">
        <ul
          ref={containerRef}
          className={`${styles.slideContainer} ${
            isDragging ? styles.dragging : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <li key={`${item.alt}-${index}`}>
              <div
                ref={itemRef}
                className={`${styles.item}`}
                style={{ backgroundImage: `url(${item.image})` }}
                title={item.alt}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
