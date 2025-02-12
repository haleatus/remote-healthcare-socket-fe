"use client";

import React, { useEffect, useRef } from "react";

interface CustomScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  autoScrollToBottom?: boolean;
}

const CustomScrollArea = ({
  children,
  className = "",
  autoScrollToBottom = false,
}: CustomScrollAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollRef.current) {
      const { scrollHeight } = scrollRef.current;
      scrollRef.current.scrollTo({
        top: scrollHeight,
        behavior,
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const scrollThreshold = 100;
      isNearBottomRef.current =
        scrollHeight - (scrollTop + clientHeight) <= scrollThreshold;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      // Initial scroll to bottom
      scrollToBottom("instant");

      // Set up scroll listener
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Auto scroll when content changes if near bottom or autoScrollToBottom is true
  useEffect(() => {
    if (autoScrollToBottom || isNearBottomRef.current) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [children, autoScrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto overflow-x-hidden relative ${className}`}
      style={{ scrollbarGutter: "stable" }}
    >
      {children}
    </div>
  );
};

export default CustomScrollArea;
