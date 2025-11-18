import { useMemo, useState, useEffect } from 'react';

import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { applyQueryOptions } from '@/app/_api/queries/apply';

import { useApplyFunnel } from '../_contexts/ApplyFunnelContext';

dayjs.extend(isBetween);

export function useApplyFormGetData(formId: number) {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const { step, setStep } = useApplyFunnel();

  const { data: sectionsData } = useSuspenseQuery(
    applyQueryOptions.sections(formId),
  );

  const sections = sectionsData?.sections || [];
  const hasMultipleSections = sections.length >= 3;
  const selectableSections = sections.filter((section) => section !== '공통');

  const sectionsToFetch = useMemo(() => {
    if (sections.length === 1) {
      return sections;
    }
    if (sections.length === 2) {
      return sections.filter((section) => section !== '공통');
    }
    return selectedSection ? [selectedSection] : [];
  }, [sections, selectedSection]);

  const { data: questionData } = useQuery({
    ...applyQueryOptions.questions(formId, sectionsToFetch[0]),
    enabled: step === 'QUESTION',
  });

  const isRecruitmentActive = useMemo(() => {
    if (!sectionsData?.startDate || !sectionsData?.endDate) return true;

    const today = dayjs();
    const startDate = dayjs(sectionsData.startDate);
    const endDate = dayjs(sectionsData.endDate).endOf('day');

    return (
      startDate.isValid() &&
      endDate.isValid() &&
      today.isBetween(startDate, endDate, 'second', '[]')
    );
  }, [sectionsData]);

  useEffect(() => {
    if (!hasMultipleSections && sections.length > 0 && step === 'SECTION') {
      const defaultSection =
        sections.length === 2
          ? sections.find((s) => s !== '공통') || sections[0]
          : sections[0];
      setSelectedSection(defaultSection);
      setStep('QUESTION');
    }
  }, [hasMultipleSections, sections, step, setStep]);

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  return {
    sections,
    selectableSections,
    sectionsData,
    selectedSection,
    questionData,
    isRecruitmentActive,
    hasMultipleSections,
    handleSectionSelect,
  };
}
