// import { useSuspenseQuery } from '@tanstack/react-query';

// import { reportQueryOptions } from '@/app/_api/queries/report';

export const useTerm = (term: number) => {
  // const { data: currentTerm } = useSuspenseQuery(
  //   reportQueryOptions.currentTerm(),
  // );
  const currentTerm = { term: 15 };

  return {
    isClosed: term < currentTerm.term,
    isFuture: term > currentTerm.term,
    currentTerm,
  };
};
