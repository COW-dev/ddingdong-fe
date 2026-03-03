'use client';

import { isMobileDevice } from '@/utils/userAgent';

import { shareCurrentLink } from '../../_utils/shareLink';

import { IntroStepDesktop } from './IntroStepDesktop';
import { IntroStepMobile } from './IntroStepMobile';

type Props = {
  onGameStart: () => void;
};

export function IntroStep({ onGameStart }: Props) {
  if (!isMobileDevice()) {
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
