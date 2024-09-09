import React, { useRef, useState, useEffect } from "react";

interface Category {
  id: string;
  title: string;
}

interface SwipeableCategoriesProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
}

const SwipeableCategories: React.FC<SwipeableCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      };
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const selectedElement = container.querySelector(
        `[data-category-id="${selectedCategory}"]`
      );
      if (selectedElement) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = selectedElement.getBoundingClientRect();
        const scrollLeft =
          elementRect.left -
          containerRect.left +
          container.scrollLeft -
          containerRect.width / 2 +
          elementRect.width / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [selectedCategory, categories]);
  return (
    <nav className="mb-8 border-b relative">
      <ul
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto whitespace-nowrap pb-2 cursor-grab active:cursor-grabbing
                   scrollbar-hide scroll-smooth select-none"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category) => (
          <li
            key={category.id}
            data-category-id={category.id}
            className={`flex-shrink-0 text-2xl font-medium py-2 transition-colors duration-200 ease-in-out text-gray-600 ${
              category.id === selectedCategory
                ? "border-b-2 border-green-500"
                : "hover:text-green-500"
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SwipeableCategories;
