import InstaImage from '@/assets/InstaImage.svg';
import KaKaoImage from '@/assets/kakaoImage.svg';

export const navItems: {
  [key: string]: {
    id: number;
    href: string;
    image?: string;
    content?: string;
  }[];
} = {
  총동아리연합회: [
    {
      id: 1,
      href: '/notice',
      content: '공지사항',
    },
    {
      id: 2,
      href: '/documents',
      content: '자료실',
    },
    {
      id: 3,
      href: '/FAQ',
      content: 'FAQ',
    },
  ],
  동아리피드: [
    {
      id: 4,
      href: '/feed',
    },
  ],
  SNS: [
    {
      id: 5,
      href: 'https://pf.kakao.com/_ExmtkG',
      image: KaKaoImage,
      content: '카카오톡',
    },
    {
      id: 6,
      href: 'https://www.instagram.com/mju_u.th/',
      image: InstaImage,
      content: '인스타그램',
    },
  ],
};
