export const useTerm = (term: number) => {
  const currentTerm = { term: 7 };

  return {
    isClosed: term < currentTerm.term,
    isFuture: term > currentTerm.term,
    currentTerm,
  };
};
