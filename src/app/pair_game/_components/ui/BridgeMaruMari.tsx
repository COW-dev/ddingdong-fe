'use client';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { GAME_IMAGES } from '../../_utils/gameImages';

type Props = {
  className?: string;
};

export function BridgeMaruMari({ className }: Props) {
  return (
    <div
      className={`pointer-events-none sm:hidden md:hidden ${className ?? ''}`.trim()}
      aria-hidden
    >
      <div className="relative w-full">
        <OptimizedImage
          src={GAME_IMAGES.bridge}
          alt=""
          className="w-full object-contain object-bottom"
          priority
        />
        <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between px-[8%] pb-[7%]">
          <OptimizedImage
            src={GAME_IMAGES.ride_maru}
            alt="마루"
            className="h-auto w-[28%] max-w-[140px] -scale-x-100 object-contain object-bottom"
            priority
          />
          <OptimizedImage
            src={GAME_IMAGES.heart_mari}
            alt="마리"
            className="h-auto w-[15%] max-w-[80px] object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}
