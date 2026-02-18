import { CLUB_IMAGE_SRCS } from './clubImages';

const CRITICAL_IMAGES = [
  '/pair_game/bell-sprite.webp',
  '/pair_game/bridge.webp',
  '/pair_game/card.webp',
  '/pair_game/heart_mari.webp',
  '/pair_game/ride_maru.webp',
  ...CLUB_IMAGE_SRCS,
];

export const preloadGameAssets = () => {
  CRITICAL_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
