'use client';

import { OptimizedImage } from '@/components/common/OptimizedImage';

const bridgeImageSrc = '/pair_game/bridge.webp';
const heartMariImageSrc = '/pair_game/heart_mari.webp';
const rideMaruImageSrc = '/pair_game/ride_maru.webp';

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
          src={bridgeImageSrc}
          alt=""
          className="w-full object-contain object-bottom"
          priority
        />
        <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between px-[8%] pb-[7%]">
          <OptimizedImage
            src={rideMaruImageSrc}
            alt="마루"
            className="h-auto w-[28%] max-w-[140px] -scale-x-100 object-contain object-bottom"
            priority
          />
          <OptimizedImage
            src={heartMariImageSrc}
            alt="마리"
            className="h-auto w-[15%] max-w-[80px] object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}
