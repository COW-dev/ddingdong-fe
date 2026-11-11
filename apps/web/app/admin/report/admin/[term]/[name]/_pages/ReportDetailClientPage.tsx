'use client';

import { useRouter } from 'next/navigation';

import { Body2, Body3, Button, Flex, Title1, usePortal } from '@dds/shared';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import { useAdminDeleteReport } from '@/_api/mutations/report';
import { reportQueryKeys, reportQueryOptions } from '@/_api/queries/report';
import { TermReport } from '@/_api/types/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';
import { ReportBundle } from '@/admin/report/[term]/[name]/_components/ReportBundle';
import { BackHeader } from '@/admin/report/_components/BackHeader';
import { DeleteModal } from '@/admin/report/_components/DeleteModal';

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
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = usePortal();
  const { mutate: deleteReport, isPending } = useAdminDeleteReport();

  const listPath = `/report/admin/${term}`;
  const handleDeleteReport = () => {
    if (isPending) return;
    deleteReport(
      { clubId, term },
      {
        onSuccess: () => {
          toast.success(REPORT_MESSAGE.deleteSuccess);
          router.push(listPath);
        },
        onError: (error: Error) => {
          if (error instanceof ApiError && error.status === 404) {
            queryClient.invalidateQueries({
              queryKey: reportQueryKeys.termReports(term),
              exact: true,
              refetchType: 'none',
            });
            toast.error(REPORT_MESSAGE.alreadyDeleted);
            return router.push(listPath);
          }
          toast.error(
            error instanceof ApiError
              ? error.message
              : REPORT_MESSAGE.deleteFail,
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
            isPending={isPending}
          />
        </>
      )}
    </>
  );
}
