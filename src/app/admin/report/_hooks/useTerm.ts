import { reportQueryOptions } from '@/app/_api/queries/report';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useTerm = (term: number) => {
  //   const { data: currentTerm } = useSuspenseQuery(
  //     reportQueryOptions.currentTerm(),
  //   );
  const currentTerm = { term: 5 };

  return {
    isClosed: term < currentTerm.term,
    isFuture: term > currentTerm.term,
    currentTerm,
  };
};
