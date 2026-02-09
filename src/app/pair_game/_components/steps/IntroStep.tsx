'use client';

import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import { GameSkeleton } from '../ui/GameSkeleton';

import { IntroStepDesktop } from './IntroStepDesktop';
import { IntroStepMobile } from './IntroStepMobile';

function getIsMobileFromUserAgent(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua,
  );
}

type Props = {
  onGameStart: () => void;
};

export function IntroStep({ onGameStart }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(getIsMobileFromUserAgent());
  }, []);

  const handleShareLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('링크가 복사되었어요.');
      } else {
        toast.error('링크 복사에 실패했어요.');
      }
    } catch {
      toast.error('링크 복사에 실패했어요.');
    }
  };

  if (isMobile === null) {
    return <GameSkeleton />;
  }

  if (!isMobile) {
    return <IntroStepDesktop onShareLink={handleShareLink} />;
  }

  return (
    <IntroStepMobile onGameStart={onGameStart} onShareLink={handleShareLink} />
  );
}
