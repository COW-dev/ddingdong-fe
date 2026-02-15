import bell1 from '../Img/bell/bell_1.webp';
import bell2 from '../Img/bell/bell_2.webp';
import bell3 from '../Img/bell/bell_3.webp';
import bell4 from '../Img/bell/bell_4.webp';
import bell5 from '../Img/bell/bell_5.webp';
import bell6 from '../Img/bell/bell_6.webp';
import bell7 from '../Img/bell/bell_7.webp';
import bell8 from '../Img/bell/bell_8.webp';
import bridge from '../Img/bridge.webp';
import card from '../Img/card.webp';
import heartMari from '../Img/heart_mari.webp';
import rideMaru from '../Img/ride_maru.webp';

const getSrc = (m: { src: string } | string) =>
  typeof m === 'string' ? m : m.src;

const CRITICAL_IMAGES = [
  card,
  bridge,
  heartMari,
  rideMaru,
  bell1,
  bell2,
  bell3,
  bell4,
  bell5,
  bell6,
  bell7,
  bell8,
].map(getSrc);

export const preloadGameAssets = () => {
  CRITICAL_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
