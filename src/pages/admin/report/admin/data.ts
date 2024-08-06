type ButtonType = 'BEFORE' | 'NOW' | 'AFTER';
type ButtonTypeDetails = {
  text: string;
  color: string;
  background_color: string;
};

export const BUTTON_TYPE: Record<ButtonType, ButtonTypeDetails> = {
  BEFORE: {
    text: '진행 전',
    color: 'text-gray-400',
    background_color: 'bg-gray-50',
  },
  NOW: {
    text: '진행 중',
    color: 'text-green-400',
    background_color: 'bg-green-50',
  },
  AFTER: {
    text: '마감',
    color: 'text-red-400',
    background_color: 'bg-red-50',
  },
};

export const termList = [
  {
    term: 1, // 1회차
    startDay: '2024-03-01',
    endDay: '2024-03-14',
  },
  {
    term: 2, // 2회차
    startDay: '2024-03-15',
    endDay: '2024-03-28',
  }, // 10회차까지 제공(최대 20주 기준)
];
