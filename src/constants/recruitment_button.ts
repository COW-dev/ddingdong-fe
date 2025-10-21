type ButtonType = 'BEFORE' | 'NOW' | 'AFTER';
type ButtonTypeDetails = {
  text: string;
  variant: 'neutral' | 'positive' | 'negative';
};

export const BUTTON_TYPE: Record<ButtonType, ButtonTypeDetails> = {
  BEFORE: {
    text: '진행 전',
    variant: 'neutral',
  },
  NOW: {
    text: '진행 중',
    variant: 'positive',
  },
  AFTER: {
    text: '마감',
    variant: 'negative',
  },
};
