import { FormField } from '@/app/_api/types/apply';

export const BASE_QUESTION: FormField[] = [
  {
    question: '',
    type: 'RADIO',
    options: ['옵션1'],
    required: true,
    order: 1,
    section: '공통',
  },
];

export const DEFAULT_SECTION = '공통';
