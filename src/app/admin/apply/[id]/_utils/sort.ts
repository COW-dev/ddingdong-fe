import { Answer } from '@/app/_api/types/apply';

export const sortFormResponses = (answer: Answer[]) =>
  [...answer].sort((a, b) => {
    if (a.section < b.section) return -1;
    if (a.section > b.section) return 1;
    return a.order - b.order;
  });
