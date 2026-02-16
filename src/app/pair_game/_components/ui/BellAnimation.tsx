'use client';

import bellSprite from '../../Img/bell-sprite.webp';

const FRAME_COUNT = 10;
const DURATION_S = 1.0;
const DELAY_S = 0.5;

const keyframesCss = `
  @keyframes bell-sprite-play {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
`;

type Props = {
  className?: string;
  alt?: string;
};

export function BellAnimation({ className = 'w-6 h-6', alt = '종' }: Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesCss }} />
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden ${className}`}
      >
        <div
          style={{
            width: `${FRAME_COUNT * 100}%`,
            height: '100%',
            backgroundImage: `url(${bellSprite.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            animation: `bell-sprite-play ${DURATION_S}s steps(${FRAME_COUNT}) ${DELAY_S}s infinite`,
          }}
        />
      </div>
    </>
  );
}
