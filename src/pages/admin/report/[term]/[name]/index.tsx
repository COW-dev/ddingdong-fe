import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import AlertDialog from '@/components/common/AlertDialog';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import Report from '@/components/report/detail/Report';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useDeleteReport } from '@/hooks/api/club/useDeleteReport';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import useModal from '@/hooks/common/useModal';
import { cn } from '@/lib/utils';

type Props = {
  term: number;
  name: string;
};

export default function Index({ term, name }: Props) {
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data.term ?? 1;
  const {
    data: { data: clubData },
  } = useMyClub(token);
  const deleteMutation = useDeleteReport();
  const reportData = useReportInfo({ term, name, token }).data?.data;
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
        <span>{clubData?.leader}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Report reportData={reportData[0]} term={term} />
        </Accordion>
        <Accordion title="활동2">
          <Report reportData={reportData[1]} term={term} />
        </Accordion>
      </div>
      <div className="m-auto flex gap-2 md:mt-6">
        <button
          className={cn(
            `mb-4 min-w-fit rounded-xl bg-red-50 px-3.5 py-2 text-sm font-bold text-red-400 transition-colors`,
            'hover:bg-red-200 md:mb-2 md:px-4 md:py-2.5 md:text-base',
            currentTermData !== Number(term) && `hidden`,
          )}
          onClick={handleClickDeleteButton}
        >
          삭제하기
        </button>
        <Link href={`/report/${term}/${name}/fix`}>
          <button
            className={cn(
              `mb-4 min-w-fit rounded-xl bg-blue-50 px-3.5 py-2 text-sm font-bold text-blue-400 transition-colors`,
              'hover:bg-blue-200 md:mb-2 md:px-4 md:py-2.5 md:text-base',
              currentTermData !== Number(term) && `hidden`,
            )}
          >
            수정하기
          </button>
        </Link>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeButton={false}
        closeModal={closeModal}
      >
        <AlertDialog onConfirm={onConfirmDelete} onCancle={closeModal} />
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
