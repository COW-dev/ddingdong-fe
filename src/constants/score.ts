import Clean from '@/assets/clean.svg';
import Dot from '@/assets/dot.svg';
import People from '@/assets/people.svg';
import PlusMinus from '@/assets/plusminus.svg';
import Report from '@/assets/report.svg';
import Report2 from '@/assets/report2.svg';

export const SCORE_TYPE = {
  CLEANING: { category: '청소', value: 'CLEANING', icon: Clean },
  ACTIVITY_REPORT: {
    category: '동아리 활동 보고서',
    value: 'ACTIVITY_REPORT',
    icon: Report,
  },
  LEADER_CONFERENCE: {
    category: '전동대회',
    value: 'LEADER_CONFERENCE',
    icon: People,
  },
  BUSINESS_PARTICIPATION: {
    category: '총동연 사업 참여',
    value: 'BUSINESS_PARTICIPATION',
    icon: Report2,
  },
  ADDITIONAL: { category: '가산점/감점', value: 'ADDITIONAL', icon: PlusMinus },
  CARRYOVER_SCORE: {
    category: '점수 이월',
    value: 'CARRYOVER_SCORE',
    icon: Dot,
  },
};
