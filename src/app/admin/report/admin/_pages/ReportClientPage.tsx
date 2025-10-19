'use client';

import Link from 'next/link';

import { useSuspenseQueries } from '@tanstack/react-query';
import {
  Badge,
  Body3,
  Card,
  Flex,
  Title1,
  Title3,
} from 'ddingdong-design-system';

import { reportQueryOptions } from '@/app/_api/queries/report';
import { BUTTON_TYPE } from '@/constants/recruitment_button';
import { parseDate } from '@/utils/parse';
import { ReportCardContainer } from '../../_containers/ReportCardContainer';

export function ReportClientPage() {
  const [{ data: currentTerm }, { data: terms }] = useSuspenseQueries({
    queries: [reportQueryOptions.currentTerm(), reportQueryOptions.terms()],
  });

  const filterPeriod = (term: number) => {
    if (term === Number(currentTerm)) return BUTTON_TYPE.NOW;
    else return BUTTON_TYPE.AFTER;
  };

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 관리
      </Title1>
      <ReportCardContainer>
        {terms?.map((termInfo) => {
          const { term, startDate, endDate } = termInfo;
          return (
            <Card
              key={term}
              className={`mb-3 ${
                filterPeriod(term) === BUTTON_TYPE.BEFORE &&
                'pointer-events-none cursor-not-allowed text-gray-300'
              }`}
            >
              <Link href={`/report/admin/${term}`} data-item={term}>
                <Flex
                  alignItems="center"
                  justifyContent="between"
                  className="h-full w-full"
                >
                  <div>
                    <Title3 weight="bold">{term}회차</Title3>
                    <Body3 className="text-gray-400">
                      {parseDate(startDate)} - {parseDate(endDate)}
                    </Body3>
                  </div>
                  <Badge
                    variant={filterPeriod(term).variant}
                    text={filterPeriod(term).text}
                  />
                </Flex>
              </Link>
            </Card>
          );
        })}
      </ReportCardContainer>
    </>
  );
}
