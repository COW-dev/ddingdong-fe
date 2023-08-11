import { DeptCaptionColor } from '@/types';
export type ItemsType = { title: string; color: string };

export const CatogoryColor: ItemsType[] = [
  { title: '봉사', color: 'pink' },
  { title: '사회연구', color: 'orange' },
  { title: '연행예술', color: 'yellow' },
  { title: '전시창작', color: 'emerald' },
  { title: '종교', color: 'cyan' },
  { title: '체육', color: 'blue' },
  { title: '학술', color: 'purple' },
  { title: '준동아리', color: 'zinc' },
];

export const BannerColor: ItemsType[] = [
  { title: '하늘', color: 'sky' },
  { title: '인디고', color: 'indigo' },
  { title: '초록', color: 'green' },
  { title: '빨강', color: 'red' },
  { title: '주황', color: 'orange' },
  { title: '노랑', color: 'yellow' },
];

export const deptCaptionColor: DeptCaptionColor = {
  봉사: 'text-pink-500',
  사회연구: 'text-orange-500',
  연행예술: 'text-yellow-500',
  전시창작: 'text-emerald-500',
  종교: 'text-cyan-500',
  체육: 'text-blue-500',
  학술: 'text-purple-500',
  준동아리: 'text-zinc-500',
};
