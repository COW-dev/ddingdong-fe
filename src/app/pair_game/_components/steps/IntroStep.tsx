'use client';

import { useEffect, useState } from 'react';

import { shareCurrentLink } from '../../_utils/shareLink';
import { GameSkeleton } from '../ui/GameSkeleton';

import { IntroStepDesktop } from './IntroStepDesktop';
import { IntroStepMobile } from './IntroStepMobile';

function getShouldUseMobileLayout(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const uaSuggestsMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTouchDevice = navigator.maxTouchPoints > 0;
  return uaSuggestsMobile || isTouchDevice;
}

type Props = {
  onGameStart: () => void;
};

export function IntroStep({ onGameStart }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(getShouldUseMobileLayout());
  }, []);

  if (isMobile === null) {
    return <GameSkeleton />;
  }

  if (!isMobile) {
    return <IntroStepDesktop onShareLink={shareCurrentLink} />;
  }

  return (
    <IntroStepMobile
      onGameStart={onGameStart}
      onShareLink={shareCurrentLink}
      animateMaru
    />
  );
}
