'use client';

import { useEffect, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

/**
 * Deferred Motion Component
 * Defers animation until after Next.js hydration to avoid layout shifts
 * and improve Core Web Vitals scores (LCP, CLS)
 */

interface DeferredMotionProps extends MotionProps {
  children: React.ReactNode;
  delayMs?: number; // Additional delay after hydration
}

export function DeferredMotion({
  children,
  delayMs = 50,
  ...motionProps
}: DeferredMotionProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for hydration to complete, then wait additional delayMs
    const timeoutId = setTimeout(() => {
      setIsHydrated(true);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  // Render without animation during hydration
  if (!isHydrated) {
    return <>{children}</>;
  }

  // Render with animation after hydration
  return <motion.div {...motionProps}>{children}</motion.div>;
}

export function DeferredSection({
  children,
  delayMs = 50,
  ...motionProps
}: DeferredMotionProps & { as?: 'section' | 'div' }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsHydrated(true);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [delayMs]);

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <motion.section {...motionProps}>
      {children}
    </motion.section>
  );
}
