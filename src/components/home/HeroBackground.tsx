'use client';

/**
 * Hero Background Component
 * Displays the hero background image
 */

export default function HeroBackground() {
  return (
    <img
      src="/hero-bg.png"
      alt="Glovanta Exim - Premium Indian exports"
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
      fetchPriority="high"
    />
  );
}
