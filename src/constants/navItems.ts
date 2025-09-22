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
      href: 'https://pf.kakao.com/_ExmtkG',
      content: '카카오톡',
    },
    {
      id: 6,
      href: 'https://www.instagram.com/mju_mode/',
      content: '인스타그램',
    },
  ],
};
