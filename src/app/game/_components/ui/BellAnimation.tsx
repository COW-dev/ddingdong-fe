'use client';

import { useEffect, useRef, useState } from 'react';

import bell1 from '../../Img/bell/bell_1.png';
import bell2 from '../../Img/bell/bell_2.png';
import bell3 from '../../Img/bell/bell_3.png';
import bell4 from '../../Img/bell/bell_4.png';
import bell5 from '../../Img/bell/bell_5.png';
import bell6 from '../../Img/bell/bell_6.png';
import bell7 from '../../Img/bell/bell_7.png';
import bell8 from '../../Img/bell/bell_8.png';

const BELL_FRAMES = [bell1, bell2, bell3, bell4, bell5, bell6, bell7, bell8];
const DELAY_MS = 600;
const DURATION_MS = 1100;
const FRAME_INTERVAL_MS = DURATION_MS / BELL_FRAMES.length;

type Props = {
  className?: string;
  alt?: string;
};

export function BellAnimation({ className, alt = '종' }: Props) {
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTimeoutId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setFrame((prev) => (prev + 1) % BELL_FRAMES.length);
      }, FRAME_INTERVAL_MS);
    }, DELAY_MS);

    return () => {
      clearTimeout(startTimeoutId);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <img
      src={BELL_FRAMES[frame].src}
      alt={alt}
      className={className}
      aria-hidden={alt === '종'}
    />
  );
}
