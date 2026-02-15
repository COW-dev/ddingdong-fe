import img1 from '../Img/clubs/1.webp';
import img10 from '../Img/clubs/10.webp';
import img11 from '../Img/clubs/11.webp';
import img12 from '../Img/clubs/12.webp';
import img13 from '../Img/clubs/13.webp';
import img14 from '../Img/clubs/14.webp';
import img15 from '../Img/clubs/15.webp';
import img16 from '../Img/clubs/16.webp';
import img17 from '../Img/clubs/17.webp';
import img18 from '../Img/clubs/18.webp';
import img19 from '../Img/clubs/19.webp';
import img2 from '../Img/clubs/2.webp';
import img20 from '../Img/clubs/20.webp';
import img21 from '../Img/clubs/21.webp';
import img22 from '../Img/clubs/22.webp';
import img23 from '../Img/clubs/23.webp';
import img24 from '../Img/clubs/24.webp';
import img25 from '../Img/clubs/25.webp';
import img26 from '../Img/clubs/26.webp';
import img27 from '../Img/clubs/27.webp';
import img28 from '../Img/clubs/28.webp';
import img29 from '../Img/clubs/29.webp';
import img3 from '../Img/clubs/3.webp';
import img30 from '../Img/clubs/30.webp';
import img31 from '../Img/clubs/31.webp';
import img32 from '../Img/clubs/32.webp';
import img33 from '../Img/clubs/33.webp';
import img34 from '../Img/clubs/34.webp';
import img35 from '../Img/clubs/35.webp';
import img36 from '../Img/clubs/36.webp';
import img37 from '../Img/clubs/37.webp';
import img38 from '../Img/clubs/38.webp';
import img4 from '../Img/clubs/4.webp';
import img5 from '../Img/clubs/5.webp';
import img6 from '../Img/clubs/6.webp';
import img7 from '../Img/clubs/7.webp';
import img8 from '../Img/clubs/8.webp';
import img9 from '../Img/clubs/9.webp';

const images: Record<number, { src: string }> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
  10: img10,
  11: img11,
  12: img12,
  13: img13,
  14: img14,
  15: img15,
  16: img16,
  17: img17,
  18: img18,
  19: img19,
  20: img20,
  21: img21,
  22: img22,
  23: img23,
  24: img24,
  25: img25,
  26: img26,
  27: img27,
  28: img28,
  29: img29,
  30: img30,
  31: img31,
  32: img32,
  33: img33,
  34: img34,
  35: img35,
  36: img36,
  37: img37,
  38: img38,
};

export const getClubImageSrc = (clubId: number): string => {
  const img = images[clubId];
  return img?.src ?? '';
};
