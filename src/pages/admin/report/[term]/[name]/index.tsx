import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import { getMyReportInfo } from '@/apis';
import Accordion from '@/components/common/Accordion';
import AlertDialog from '@/components/common/AlertDialog';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import Report from '@/components/report/detail/Report';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useDeleteReport } from '@/hooks/api/club/useDeleteReport';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useMyReportInfo } from '@/hooks/api/club/useMyReportInfo';
import useModal from '@/hooks/common/useModal';
import { ReportKey } from '@/types/report';

export default function Index({ term, name }: ReportKey) {
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data.term ?? 1;
  const { data: clubData } = useMyClub(token);
  const deleteMutation = useDeleteReport();
  const reportData = useMyReportInfo({ term, token }).data?.data;
  if (!reportData) return;

  const handleClickDeleteButton = () => {
    openModal();
  };

  const onConfirmDelete = () => {
    deleteMutation.mutate({
      term,
      token,
    });
  };

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <Heading>활동 보고서 확인하기</Heading>
        <span className="md:text-md mt-3 text-base">
          제출일시 {reportData[0]?.createdAt}
        </span>
      </div>
      <div className="mt-3 space-x-2 text-base font-semibold text-gray-500">
        <span className="after:ml-2 after:content-['|']">{name}</span>
        <span>{clubData?.data.leader}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Report reportData={reportData[0]} term={term} />
        </Accordion>
        <Accordion title="활동2">
          <Report reportData={reportData[1]} term={term} />
        </Accordion>
      </div>
      <div className="m-auto mt-20 flex gap-2">
        <button
          className={`mb-4 w-18 rounded-xl bg-red-100 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-200 md:mb-2 md:px-4 md:py-2.5 md:text-base ${
            currentTermData !== String(term) && 'hidden'
          }`}
          onClick={handleClickDeleteButton}
        >
          삭제
        </button>
        <Link href={`/report/${term}/${name}/fix`}>
          <button
            className={`mb-4 w-18 rounded-xl bg-blue-100 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:mb-2 md:px-4 md:py-2.5 md:text-base ${
              currentTermData !== String(term) && 'hidden'
            }
            `}
          >
            수정
          </button>
        </Link>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeButton={false}
        closeModal={closeModal}
      >
        <AlertDialog onConfirm={onConfirmDelete} onCancel={closeModal} />
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term, name } = context.query;
  return {
    props: {
      term: term,
      name: name,
    },
  };
};
