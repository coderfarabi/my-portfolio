"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { getHero } from "@/lib/api";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const isTouch = isTouchDevice();

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

  const spawnRipple = useCallback((x: number, y: number) => {
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    getHero()
      .then((hero) => {
        if (hero.cursorEnabled === false) setEnabled(false);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!enabled || isTouch) return;
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
  }, [enabled, isTouch, moveCursor, onHover]);

  useEffect(() => {
    if (!enabled || !isTouch) return;
    const handler = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        spawnRipple(t.clientX, t.clientY);
      }
    };
    window.addEventListener("touchstart", handler, { passive: true });
    return () => window.removeEventListener("touchstart", handler);
  }, [enabled, isTouch, spawnRipple]);

  if (!enabled) return null;

  return (
    <>
      {!isTouch && (
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
      )}

      {isTouch && (
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="fixed pointer-events-none z-[9999]"
              style={{
                left: ripple.x,
                top: ripple.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{
                width: 60,
                height: 60,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="size-full rounded-full"
                style={{ background: "var(--color-accent)" }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
}
