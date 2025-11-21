'use client';

import { Body2, Flex, Title1 } from 'ddingdong-design-system';

import { ApplyForm } from '../_components/ApplyForm';
import { RecruitmentPeriodWarning } from '../_components/RecruitmentPeriodWarning';
import { SectionStep } from '../_components/SectionStep';
import { Submitted } from '../_components/Submitted';
import {
  ApplyFunnelProvider,
  useApplyFunnel,
} from '../_contexts/ApplyFunnelContext';
import { useApplyFormGetData } from '../_hooks/useApplyFormGetData';

function ApplySubmitContent({ id }: { id: number }) {
  const {
    sectionsData,
    selectedSection,
    questionData,
    isRecruitmentActive,
    hasMultipleSections,
    selectableSections,
    handleSectionSelect,
  } = useApplyFormGetData(id);

  const { Funnel, step } = useApplyFunnel();

  if (!isRecruitmentActive && sectionsData) {
    return (
      <RecruitmentPeriodWarning
        startDate={sectionsData.startDate}
        endDate={sectionsData.endDate}
      />
    );
  }

  return (
    <>
      {step !== 'SUBMITTED' && (
        <Flex dir="col" gap={4} className="w-full">
          <Title1 as="h1" weight="bold" className="pt-7 md:pt-10">
            {sectionsData?.title} 지원서
          </Title1>
          <Body2 weight="medium" className="my-4 text-gray-500">
            {sectionsData?.description}
          </Body2>
        </Flex>
      )}
      <Funnel>
        <Funnel.Step name="SECTION">
          {hasMultipleSections && (
            <SectionStep
              selectableSections={selectableSections}
              selectedSection={selectedSection}
              onSectionSelect={handleSectionSelect}
            />
          )}
        </Funnel.Step>

        <Funnel.Step name="QUESTION">
          {questionData && (
            <ApplyForm formId={id} formFields={questionData.formFields} />
          )}
        </Funnel.Step>

        <Funnel.Step name="SUBMITTED">
          {questionData && (
            <Submitted
              applicationCount={questionData.applicationCount}
              clubName={questionData.clubName}
            />
          )}
        </Funnel.Step>
      </Funnel>
    </>
  );
}

export function ApplySubmitClientPage({ id }: { id: number }) {
  return (
    <ApplyFunnelProvider>
      <ApplySubmitContent id={id} />
    </ApplyFunnelProvider>
  );
}
