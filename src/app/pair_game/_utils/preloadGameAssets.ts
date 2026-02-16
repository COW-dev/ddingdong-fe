import bellSprite from '../Img/bell-sprite.webp';
import bridge from '../Img/bridge.webp';
import card from '../Img/card.webp';
import heartMari from '../Img/heart_mari.webp';
import rideMaru from '../Img/ride_maru.webp';

import { CLUB_IMAGE_SRCS } from './clubImages';

const getSrc = (m: { src: string } | string) =>
  typeof m === 'string' ? m : m.src;

const CRITICAL_IMAGES = [card, bridge, heartMari, rideMaru, bellSprite]
  .map(getSrc)
  .concat(CLUB_IMAGE_SRCS);

export const preloadGameAssets = () => {
  CRITICAL_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
