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
