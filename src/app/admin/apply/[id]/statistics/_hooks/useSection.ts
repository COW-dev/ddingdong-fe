import { useState, useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { ApplyQuestion } from '@/app/_api/types/apply';

export const useSection = (applyId: number) => {
  const { data: statisticsData } = useSuspenseQuery(
    applyQueryOptions.statistics(applyId),
  );
  const sections = statisticsData.fieldStatistics.sections;
  const [focusSection, setFocusSection] = useState(sections[0]);

  const filteredQuestions = useMemo(() => {
    return statisticsData.fieldStatistics.fields.filter(
      (item: ApplyQuestion) => item.section === focusSection,
    );
  }, [statisticsData, focusSection]);

  return {
    focusSection,
    setFocusSection,
    sections,
    filteredQuestions,
  };
};
