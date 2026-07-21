"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getHero } from "@/lib/api";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const moveCursor = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const onHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickable =
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button") ||
      (target.hasAttribute("role") &&
        target.getAttribute("role") === "button");
    setHovering(!!clickable);
  }, []);

  useEffect(() => {
    getHero()
      .then((hero) => {
        if (hero.cursorEnabled === false) setEnabled(false);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("cursor-hidden");
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));
    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mouseleave", () => setVisible(false));
      window.removeEventListener("mouseenter", () => setVisible(true));
    };
  }, [enabled, moveCursor, onHover]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 10 : 6,
          height: hovering ? 10 : 6,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="size-full rounded-full"
          style={{ background: "var(--color-accent)" }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="size-full rounded-full"
          style={{ border: "1.5px solid var(--color-accent)" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--color-accent)" }}
          animate={{ opacity: hovering ? 0.1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        {hovering && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid var(--color-accent)",
              background: "var(--color-accent)",
            }}
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </>
  );
}
