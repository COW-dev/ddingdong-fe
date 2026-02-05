'use client';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { CARD_FRONT_PALETTES } from '../../_utils/gameConstants';
import cardBackImage from '../../Img/card.png';

type Props = {
  pairIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
  isDisabled: boolean;
  onClick: () => void;
  width?: number | string;
  height?: number | string;
};

const cardBackSrc =
  typeof cardBackImage === 'string' ? cardBackImage : cardBackImage.src;

const DEFAULT_SIZE = { width: 80, height: 105 };

export function Card({
  pairIndex,
  isFlipped,
  isMatched,
  isDisabled,
  onClick,
  width = DEFAULT_SIZE.width,
  height = DEFAULT_SIZE.height,
}: Props) {
  const palette = CARD_FRONT_PALETTES[pairIndex] ?? CARD_FRONT_PALETTES[0];
  const isFlippedOrMatched = isFlipped || isMatched;

  const widthStyle =
    typeof width === 'string' ? width : `${width ?? DEFAULT_SIZE.width}px`;
  const heightStyle =
    typeof height === 'string' ? height : `${height ?? DEFAULT_SIZE.height}px`;

  return (
    <div
      className="shrink-0"
      style={{
        perspective: '1000px',
        width: widthStyle,
        height: heightStyle,
      }}
    >
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`relative h-full w-full transition-transform duration-500 ${
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlippedOrMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute inset-0 z-20"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <OptimizedImage
            src={cardBackSrc}
            alt="카드 뒷면"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div
          className="absolute inset-0 z-10 box-border flex items-center justify-center rounded-xl"
          style={{
            backgroundColor: palette.backgroundColor,
            border: `2px solid ${palette.borderColor}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        />
      </button>
    </div>
  );
}
