import { useSuspenseQuery } from '@tanstack/react-query';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { AnswerItem, FileItem } from '@/types/apply';

export const useQuestion = (id: number) => {
  const { data: answerData } = useSuspenseQuery(
    applyQueryOptions.singleField(id),
  );

  const groupFileItems = (data: AnswerItem[]) => {
    const grouped = data.reduce<Record<number, FileItem>>(
      (acc, { applicationId, name, answer }) => {
        if (!acc[applicationId]) {
          acc[applicationId] = { applicationId, name, answer: [] };
        }
        acc[applicationId].answer.push(answer);
        return acc;
      },
      {},
    );
    return Object.values(grouped);
  };

  const answers =
    answerData.type === 'FILE'
      ? groupFileItems(answerData.answers)
      : (answerData.answers ?? []);

  return { answers };
};
