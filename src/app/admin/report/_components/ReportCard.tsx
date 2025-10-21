import Link from 'next/link';

import { useSuspenseQueries } from '@tanstack/react-query';
import { Badge, cn, Title3, Body3, Card } from 'ddingdong-design-system';

import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { Term } from '@/app/_api/types/report';
import { parseDate } from '@/utils/parse';

type ReportCardProps = {
  termInfo: Term;
};

export function ReportCard({ termInfo }: ReportCardProps) {
  const { term } = termInfo;
  // const [{ data: currentTerm }, { data: myReports }, { data: myClubData }] =
  const [{ data: temp }, { data: myReports }, { data: myClubData }] =
    useSuspenseQueries({
      queries: [
        reportQueryOptions.currentTerm(),
        reportQueryOptions.myReports(),
        clubQueryOptions.my(),
      ],
    });
  const currentTerm = { term: 5 };

  const submittedTerms = myReports.map((report) => report.term);
  const submittedClosedTerms = submittedTerms.filter(
    (term) => Number(term) <= Number(currentTerm.term),
  );

  const isClosed = term < Number(currentTerm.term);
  const isFuture = term > Number(currentTerm.term);

  if (submittedClosedTerms.includes(String(term))) {
    return (
      <CardContent
        termInfo={termInfo}
        link={`/report/${term}/${myClubData.name}`}
        status="submitted"
      />
    );
  }

  return (
    <CardContent
      link={isClosed ? '' : `/report/${term}/new`}
      termInfo={termInfo}
      status={isClosed ? 'missed' : 'pending'}
      disabled={isFuture}
    />
  );
}

function CardContent({
  termInfo,
  status,
  link,
  disabled = false,
}: {
  termInfo: Term;
  status: 'submitted' | 'pending' | 'missed';
  link: string;
  disabled?: boolean;
}) {
  type StatusType = {
    [key: string]: {
      label: string;
      variant: 'positive' | 'neutral' | 'negative';
      isDisabled: boolean;
    };
  };

  const statusMap: StatusType = {
    submitted: {
      label: '제출완료',
      variant: 'positive',
      isDisabled: false,
    },
    pending: {
      label: '제출하기',
      variant: 'neutral',
      isDisabled: false,
    },
    missed: {
      label: '미제출',
      variant: 'negative',
      isDisabled: true,
    },
  };

  const { label, variant, isDisabled } = statusMap[status];
  const { term, startDate, endDate } = termInfo;
  return (
    <Link href={link}>
      <Card
        as="li"
        className={cn(
          'mb-3 flex h-full w-full items-center justify-between rounded-xl border-[1.5px] border-gray-100 bg-white p-5 transition-colors md:p-6',
          disabled || isDisabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:border-gray-200 hover:bg-gray-50',
        )}
        aria-label={`${term} 회차 활동보고서 보기`}
      >
        <div>
          <Title3 weight="bold">{term}회차</Title3>
          <Body3 weight="normal" className="text-gray-300">
            {parseDate(startDate)} - {parseDate(endDate)}
          </Body3>
        </div>
        <Badge text={label} variant={variant} />
      </Card>
    </Link>
  );
}
