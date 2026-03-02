import { GAME_IMAGES } from '../_constants/gameImages';
import { CLUB_IMAGE_SRCS } from './clubImages';

const CRITICAL_IMAGES = [
  GAME_IMAGES['bell-sprite'],
  GAME_IMAGES.bridge,
  GAME_IMAGES.card,
  GAME_IMAGES.heart_mari,
  GAME_IMAGES.ride_maru,
  ...CLUB_IMAGE_SRCS,
];

export const preloadGameAssets = () => {
  CRITICAL_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
