'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Title1 } from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';

import { ReportCardContainer } from '../../_containers/ReportCardContainer';
import { ReportCard } from '../_components/ReportCard';

export function ReportClientPage() {
  const { data: terms } = useSuspenseQuery(reportQueryOptions.terms());

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 관리
      </Title1>
      <ReportCardContainer>
        {terms?.map((termInfo) => {
          return <ReportCard termInfo={termInfo} key={termInfo.term} />;
        })}
      </ReportCardContainer>
    </>
  );
}
