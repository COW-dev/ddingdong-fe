export type CategoryStyle = {
  borderColor: string;
  backgroundGradient: string;
};

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  봉사: {
    borderColor: '#FFDADA',
    backgroundGradient: 'linear-gradient(180deg, #FEF2F2 0%, #FFFBFB 100%)',
  },
  사회연구: {
    borderColor: '#FFE6C7',
    backgroundGradient: 'linear-gradient(180deg, #FFF7ED 0%, #FFFCF9 100%)',
  },
  연행예술: {
    borderColor: '#FFFACC',
    backgroundGradient: 'linear-gradient(180deg, #FEFCE8 0%, #FFFEF4 100%)',
  },
  전시창작: {
    borderColor: '#E7FFB1',
    backgroundGradient: 'linear-gradient(180deg, #F7FEE7 0%, #FCFFF6 100%)',
  },
  종교: {
    borderColor: '#C5E8FF',
    backgroundGradient: 'linear-gradient(180deg, #F0F9FF 0%, #F7FCFF 100%)',
  },
  체육: {
    borderColor: '#D4CBFF',
    backgroundGradient: 'linear-gradient(180deg, #F5F3FF 0%, #F9F8FF 100%)',
  },
  학술: {
    borderColor: '#F6D0FF',
    backgroundGradient: 'linear-gradient(180deg, #FDF4FF 0%, #FFFEFF 100%)',
  },
  준동아리: {
    borderColor: '#D1D1D1',
    backgroundGradient: 'linear-gradient(180deg, #E2E5EB 0%, #FAFAFA 100%)',
  },
};

export const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  borderColor: '#D1D1D1',
  backgroundGradient: 'linear-gradient(180deg, #E2E5EB 0%, #FAFAFA 100%)',
};

export const CARD_SIZES: Record<string, { width: number; height: number }> = {
  '2x3': { width: 92, height: 121 },
  '2x4': { width: 80, height: 105 },
  '4x3': { width: 80, height: 105 },
  '4x4': { width: 66, height: 87 },
  '4x5': { width: 66, height: 87 },
};
