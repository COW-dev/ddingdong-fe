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
      href: '/faq',
      content: 'FAQ',
    },
  ],
  동아리피드: [
    {
      id: 4,
      href: '/feeds',
    },
  ],
  SNS: [
    {
      id: 5,
      href: 'https://pf.kakao.com/_Fvdwn',
      image: KaKaoImage,
      content: '카카오톡',
    },
    {
      id: 6,
      href: 'https://www.instagram.com/mju_mode?igsh=cGNxM29sMHd6dzVy',
      image: InstaImage,
      content: '인스타그램',
    },
  ],

  '동아리 박람회 이벤트': [
    {
      id: 7,
      href: '/pair_game',
      content: '동아리 카드 짝 맞추기 게임',
    },
  ],
};
