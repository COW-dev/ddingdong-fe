'use client';

import { useRouter } from 'next/navigation';

import { Body2, Body3, Button, Flex, Title1, usePortal } from '@dds/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import { useAdminDeleteReport } from '@/_api/mutations/report';
import { reportQueryOptions } from '@/_api/queries/report';
import { TermReport } from '@/_api/types/report';
import { DeleteModal } from '@/admin/report/[term]/[name]/_components/DeleteModal';
import { ReportBundle } from '@/admin/report/[term]/[name]/_components/ReportBundle';
import { BackHeader } from '@/admin/report/_components/BackHeader';

export function getClubId(reports: TermReport[], name: string) {
  const club = reports.find((item) => item.club.name === name);
  return club?.club.id ?? 0;
}

export function ReportDetailClientPage({
  term,
  name,
}: {
  term: number;
  name: string;
}) {
  const { data: termreports } = useSuspenseQuery(
    reportQueryOptions.termReports(term),
  );

  const clubId = getClubId(termreports ?? [], name);
  const { data: reports } = useSuspenseQuery(
    reportQueryOptions.report(term, clubId),
  );
  const router = useRouter();
  const { isOpen, openModal, closeModal } = usePortal();
  const { mutate: deleteReport } = useAdminDeleteReport();

  const listPath = `/report/admin/${term}`;
  const handleDeleteReport = () => {
    deleteReport(
      { clubId, term },
      {
        onSuccess: () => {
          toast.success('활동보고서를 삭제했어요.');
          router.push(listPath);
        },
        onError: (error: Error) => {
          if (error instanceof ApiError && error.status === 404) {
            toast.error('이미 삭제된 활동보고서예요.');
            return router.push(listPath);
          }
          toast.error(
            error instanceof ApiError
              ? error.message
              : '활동보고서 삭제에 실패했어요.',
          );
        },
        onSettled: closeModal,
      },
    );
  };

  return (
    <>
      <Flex
        justifyContent="between"
        className="items-end pt-7 md:items-start md:pt-10"
      >
        <div>
          <Title1 weight="bold" className="pb-7 md:pb-10">
            활동보고서 관리
          </Title1>
          <BackHeader title={`${term}회차 / ${name}`} />
        </div>
        <Body3 weight="normal">
          <Body3
            as="span"
            weight="normal"
            className="text-right max-sm:block md:mr-1"
          >
            제출일시
          </Body3>
          {reports[0]?.createdAt}
        </Body3>
      </Flex>
      <ReportBundle reports={reports} />
      {clubId !== 0 && (
        <>
          <Flex className="m-auto mt-10 w-fit">
            <Button variant="primary" color="red" onClick={openModal}>
              <Body2 weight="bold">삭제</Body2>
            </Button>
          </Flex>
          <DeleteModal
            isOpen={isOpen}
            closeModal={closeModal}
            onDeleteReport={handleDeleteReport}
          />
        </>
      )}
    </>
  );
}
