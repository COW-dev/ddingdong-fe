import { ApplyQuestion, ApplyRate, ChartItem } from '@/components/ui/bar-chart';

export type ApplyStatistics = {
  totalCount: number;
  departmentStatistics: ChartItem[];
  applicantStatistics: ApplyRate[];
  fieldStatistics: fieldStatistics;
};
export type fieldStatistics = {
  fields: ApplyQuestion[];
  sections: string[];
};

export const MOCK_ApplyStatistics: ApplyStatistics = {
  totalCount: 50,
  departmentStatistics: [
    {
      rank: 1,
      label: '응용소프트웨어',
      count: 5,
      ratio: 30,
    },
    {
      rank: 2,
      label: '데이터사이언스',
      count: 4,
      ratio: 25,
    },
    {
      rank: 3,
      label: '디지털미디어',
      count: 3,
      ratio: 20,
    },
    {
      rank: 4,
      label: '디지털콘텐츠디자인',
      count: 2,
      ratio: 15,
    },
    {
      rank: 5,
      label: '경영학과',
      count: 1,
      ratio: 10,
    },
  ],
  applicantStatistics: [
    {
      label: '2025-1',
      count: 30,
      comparedToBefore: {
        //전 폼지 대비 증감 값
        ratio: 50, // 증감율 %
        value: 15, // 증가수치 및 감소수치
      },
    },
    {
      label: '2025-2',
      count: 45,
      comparedToBefore: {
        //전 폼지 대비 증감 값
        ratio: 50, // 증감율 %
        value: 85, // 증가수치 및 감소수치
      },
    },
  ],
  fieldStatistics: {
    sections: ['공통', '서버', '웹'],
    fields: [
      {
        id: 1,
        question: '질문입니다. 개발자인가요?',
        count: 5,
        type: 'RADIO',
        section: '공통',
      },
      {
        id: 2,
        question: '질문입니다. 개발자인가요?',
        count: 5,
        type: 'CHECK_BOX',
        section: '서버',
      },
      {
        id: 3,
        question: '질문입니다. 개발자인가요?',
        count: 5,
        type: 'TEXT',
        section: '웹',
      },
    ],
  },
};
