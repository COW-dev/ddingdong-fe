'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Title1 } from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';

import { ReportCard } from '../_components/ReportCard';
import { ReportCardContainer } from '../_containers/ReportCardContainer';

export function ReportClientPage() {
  const { data: terms } = useSuspenseQuery(reportQueryOptions.terms());

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 작성
      </Title1>
      <ReportCardContainer>
        {terms.map((termInfo) => (
          <ReportCard termInfo={termInfo} key={termInfo.term} />
        ))}
      </ReportCardContainer>
    </>
  );
}
