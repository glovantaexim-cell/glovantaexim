'use client';

import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function Counter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isIntersecting || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      const currentCount = Math.floor(easeOutQuad * end);

      setCount(currentCount);

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isIntersecting, end, duration]);

  return (
    <span ref={ref as any}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
