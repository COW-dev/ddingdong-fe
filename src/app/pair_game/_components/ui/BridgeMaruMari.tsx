'use client';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { GAME_IMAGES } from '../../_utils/gameImages';

export type Props = {
  className?: string;
  animateMaru?: boolean;
  driveDistance?: string;
};

export function BridgeMaruMari({
  className,
  animateMaru,
  driveDistance,
}: Props) {
  const maruClassName = [
    'h-auto w-[28%] max-w-[140px] object-contain object-bottom',
    animateMaru ? 'maru-slow-drive' : '-scale-x-100',
  ]
    .filter(Boolean)
    .join(' ');

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
        <div className="absolute right-0 bottom-0 -left-2 flex items-end justify-between pr-[2%] pb-[7%]">
          <OptimizedImage
            src={GAME_IMAGES.ride_maru}
            alt="마루"
            className={maruClassName}
            style={{
              ...(driveDistance
                ? ({
                    '--maru-drive-distance': driveDistance,
                  } as React.CSSProperties)
                : {}),
              ...(animateMaru
                ? ({
                    animationIterationCount: '1',
                    animationFillMode: 'forwards',
                  } as React.CSSProperties)
                : {}),
            }}
            priority
          />
          <OptimizedImage
            src={GAME_IMAGES.heart_mari}
            alt="마리"
            className="h-auto w-[15%] max-w-[80px] -scale-x-100 object-contain object-bottom pb-[2%]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
