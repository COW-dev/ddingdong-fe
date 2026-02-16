'use client';

import { getClubImageSrc } from '../../_utils/clubImages';
import { getCategoryCardStyle } from '../../_utils/gameConstants';
import cardBackImage from '../../Img/card.webp';

type Props = {
  clubId: number;
  category: string;
  clubName: string;
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

export function EventCard({
  clubId,
  category,
  clubName,
  isFlipped,
  isMatched,
  isDisabled,
  onClick,
  width = DEFAULT_SIZE.width,
  height = DEFAULT_SIZE.height,
}: Props) {
  const style = getCategoryCardStyle(category);
  const imageSrc = getClubImageSrc(clubId);
  const isFlippedOrMatched = isFlipped || isMatched;

  const widthStyle = typeof width === 'string' ? width : `${width}px`;
  const heightStyle = typeof height === 'string' ? height : `${height}px`;

  const handlePointerUp = () => {
    if (isDisabled) return;
    onClick();
  };

  return (
    <div
      className="sh0 z-20"
      style={{
        perspective: '1000px',
        width: widthStyle,
        height: heightStyle,
      }}
    >
      <button
        type="button"
        onPointerUp={handlePointerUp}
        disabled={isDisabled}
        className={`relative h-full w-full transition-transform duration-500 ${
          isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlippedOrMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            pointerEvents: 'none',
          }}
        >
          <img
            src={cardBackSrc}
            alt="카드 뒷면"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div
          className="absolute inset-0 box-border flex items-center justify-center overflow-hidden rounded-xl p-3"
          style={{
            background: style.backgroundGradient,
            border: `2px solid ${style.borderColor}`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            pointerEvents: 'none',
          }}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={clubName}
              className="max-h-full max-w-full object-contain"
            />
          ) : null}
        </div>
      </button>
    </div>
  );
}
