import img1 from '../Img/clubs/1.png';
import img2 from '../Img/clubs/2.png';
import img3 from '../Img/clubs/3.png';
import img4 from '../Img/clubs/4.png';
import img5 from '../Img/clubs/5.png';
import img6 from '../Img/clubs/6.png';
import img7 from '../Img/clubs/7.png';
import img8 from '../Img/clubs/8.png';
import img9 from '../Img/clubs/9.png';
import img10 from '../Img/clubs/10.png';
import img11 from '../Img/clubs/11.png';
import img12 from '../Img/clubs/12.png';
import img13 from '../Img/clubs/13.png';
import img14 from '../Img/clubs/14.png';
import img15 from '../Img/clubs/15.png';
import img16 from '../Img/clubs/16.png';
import img17 from '../Img/clubs/17.png';
import img18 from '../Img/clubs/18.png';
import img19 from '../Img/clubs/19.png';
import img20 from '../Img/clubs/20.png';
import img21 from '../Img/clubs/21.png';
import img22 from '../Img/clubs/22.png';
import img23 from '../Img/clubs/23.png';
import img24 from '../Img/clubs/24.png';
import img25 from '../Img/clubs/25.png';
import img26 from '../Img/clubs/26.png';
import img27 from '../Img/clubs/27.png';
import img28 from '../Img/clubs/28.png';
import img29 from '../Img/clubs/29.png';
import img30 from '../Img/clubs/30.png';
import img31 from '../Img/clubs/31.png';
import img32 from '../Img/clubs/32.png';
import img33 from '../Img/clubs/33.png';
import img34 from '../Img/clubs/34.png';
import img35 from '../Img/clubs/35.png';
import img36 from '../Img/clubs/36.png';
import img37 from '../Img/clubs/37.png';
import img38 from '../Img/clubs/38.png';
import img39 from '../Img/clubs/39.png';

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
  39: img39,
};

export function getClubImageSrc(clubId: number): string {
  const img = images[clubId];
  return img?.src ?? '';
}
