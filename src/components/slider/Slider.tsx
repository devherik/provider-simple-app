"use client";

import { useCallback, useState, useRef, use, useEffect } from "react";
import styles from "./slider.module.css";
import EnterAnimation from "../../animations/enter_animation/EnterAnimation";

interface SlideItem {
  image: string;
  alt: string;
  description: string;
  link: string;
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
    {
      image: "src/assets/images/planets/mercury.png",
      alt: "Mercury",
      description:
        "Mercury is the planet nearest to the Sun, and the smallest planet in our solar system.",
      link: "https://science.nasa.gov/mercury/facts/",
    },
    {
      image: "src/assets/images/planets/venus.png",
      alt: "Venus",
      description:
        "Venus is the second planet from the Sun, and the sixth largest planet.",
      link: "https://science.nasa.gov/venus/facts/",
    },
    {
      image: "src/assets/images/planets/earth.png",
      alt: "Earth",
      description:
        "Earth – our home planet – is the third planet from the Sun, and the fifth largest planet.",
      link: "https://science.nasa.gov/earth/facts/",
    },
    {
      image: "src/assets/images/planets/mars.png",
      alt: "Mars",
      description:
        "Mars is the fourth planet from the Sun, and the seventh largest planet.",
      link: "https://science.nasa.gov/mars/facts/",
    },
    {
      image: "src/assets/images/planets/jupiter.png",
      alt: "Jupiter",
      description:
        "Jupiter is the fifth planet from the Sun, and the largest planet in our solar system.",
      link: "https://science.nasa.gov/jupiter/facts/",
    },
    {
      image: "src/assets/images/planets/saturn.png",
      alt: "Saturn",
      description:
        "Saturn is the sixth planet from the Sun, the second largest planet in our solar system.",
      link: "https://science.nasa.gov/saturn/facts/",
    },
    {
      image: "src/assets/images/planets/uranus.png",
      alt: "Uranus",
      description:
        "Uranus is the seventh planet from the Sun, and the third largest planet in our solar system.",
      link: "https://science.nasa.gov/uranus/facts/",
    },
    {
      image: "src/assets/images/planets/neptune.png",
      alt: "Neptune",
      description:
        "Neptune is the eighth and most distant planet in our solar system. It's the fourth largest planet.",
      link: "https://science.nasa.gov/neptune/facts/",
    },
  ]);
  const [focusedItem, setFocusedItem] = useState<SlideItem | null>(items[2]);
  setBackgroundImage(focusedItem?.image || "");
  const containerRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState<number | null>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (focusedItem) {
      console.info("Focused item changed:", focusedItem);
    }
  }, [focusedItem, setBackgroundImage]);

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
    const container = containerRef.current;

    // Check if the click target is an item (not the container)
    const clickedItem = (e.target as HTMLElement).closest(`.${styles.item}`);

    if (clickedItem) {
      // Click was on an item - find which item it was
      // Using spread syntax is a concise way to convert NodeList to Array
      const itemElements = [...container.querySelectorAll(`.${styles.item}`)];
      const itemIndex = itemElements.indexOf(clickedItem as HTMLElement);
      if (itemIndex !== -1) {
        setClickedItemIndex(itemIndex);
      }
    }

    // Always set up drag state
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
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
      setFocusedItem(item);
      updateStack({ index });
    },
    [setBackgroundImage, updateStack]
  );

  const handleMouseUp = useCallback(() => {
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
      <EnterAnimation duration={0.5}>
        <h2 className="text-2xl font-bold mb-4">{focusedItem?.alt || ""}</h2>
        <p className="text-gray-600 mb-4">
          {focusedItem?.description || ""}
        </p>
        <a
          href={focusedItem?.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
      </EnterAnimation>
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
