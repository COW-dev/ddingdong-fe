import { IconName } from 'ddingdong-design-system';

export const CATEGORY: Record<string, { name: string; icon: IconName }> = {
  CLEANING: { name: '청소', icon: 'dustpan' },
  ACTIVITY_REPORT: {
    name: '동아리 활동 보고서',
    icon: 'report',
  },
  LEADER_CONFERENCE: {
    name: '전동대회',
    icon: 'peoples',
  },
  BUSINESS_PARTICIPATION: {
    name: '총동연 사업 참여',
    icon: 'shortReport',
  },
  ADDITIONAL: {
    name: '가산점/감점',
    icon: 'plusMinus',
  },
  CARRYOVER_SCORE: {
    name: '점수 이월',
    icon: 'dots',
  },
};
