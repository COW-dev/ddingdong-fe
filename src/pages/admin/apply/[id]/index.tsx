import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Bin from '@/assets/bin-bold.svg';
import Chart from '@/assets/chart.svg';
import Etc from '@/assets/etc.svg';
import LeftArrow from '@/assets/leftArrow2.svg';
import ApplicantList from '@/components/apply/ApplicantList';
import AlertDialog from '@/components/common/AlertDialog';
import Modal from '@/components/common/Modal';
import Tabs from '@/components/feed/Tabs';
import Loading from '@/components/loading/Loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAllApplication } from '@/hooks/api/apply/useAllApplication';
import { useDeleteApplication } from '@/hooks/api/apply/useDeleteApply';
import { useRegisterApplicant } from '@/hooks/api/apply/useRegisterApplicant';
import useModal from '@/hooks/common/useModal';
import { TabMenu } from '@/types/feed';
import { filterApplicants } from '@/utils/filter';

type Props = {
  id: number;
  isActive: boolean;
};

export default function Index({ id, isActive }: Props) {
  const [{ token }] = useCookies(['token']);
  const current = new Date().toISOString().split('T')[0];

  const { data: data, isLoading } = useAllApplication(id, token);
  const deleteMutation = useDeleteApplication();
  const registerMutation = useRegisterApplicant();

  const { openModal, visible, closeModal, modalRef } = useModal();

  const applicationData = data?.data;

  const { documentApplicants, interviewApplicants } = filterApplicants(
    applicationData?.formApplications ?? [],
  );

  const handleRegister = () => {
    registerMutation.mutate({
      formId: id,
      token,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      formId: id,
      token,
    });
  };

  const ClubTabMenus: TabMenu[] = [
    {
      label: '서류',
      content: <ApplicantList data={documentApplicants ?? []} />,
    },
    {
      label: '면접',
      content: (
        <ApplicantList type="INTERVIEW" data={interviewApplicants ?? []} />
      ),
    },
  ];

  if (isLoading || !applicationData) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="mt-7 flex items-center justify-between">
        <div className="flex flex-row items-center justify-between">
          <Link href="/apply" className="flex items-end">
            <Image
              src={LeftArrow}
              alt="back"
              width={40}
              height={40}
              className="mb-1 size-6 md:mb-0.5 md:size-9"
            />
            <h1 className="ml-3 text-2xl font-bold md:text-4xl">
              {applicationData.title}
            </h1>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/statistics">
            <Image src={Chart} alt="chart" width={32} height={32} />
          </Link>
          <Image
            src={Bin}
            alt="bin"
            width={32}
            height={32}
            onClick={openModal}
            className="hidden cursor-pointer md:block"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="mt-0.5 block items-center p-0 outline-none md:hidden">
              <Image
                src={Etc}
                alt="bin"
                width={32}
                height={32}
                onClick={openModal}
                className=" cursor-pointer md:hidden"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 flex min-w-[110px] translate-x-[-30px] flex-col items-center border-t-0 p-2 text-center font-semibold md:min-w-[120px]">
              <DropdownMenuItem
                onClick={openModal}
                className="w-full justify-center text-center text-sm text-gray-500 md:text-base"
              >
                삭제
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleRegister}
                className="w-full justify-center text-sm text-gray-500 md:text-base"
              >
                명단 연동
              </DropdownMenuItem>
              <DropdownMenuItem className="w-full justify-center text-sm text-gray-500 md:text-base">
                이메일 전송
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className={`${
          applicationData.hasInterview ? 'mb-0 mt-11' : 'my-11'
        } flex flex-row justify-between`}
      >
        <div className="flex flex-col">
          <div className="text-base font-bold md:text-2xl">
            <span
              className={`${
                isActive
                  ? applicationData.startDate > current
                    ? 'text-blue-500'
                    : 'text-gray-500'
                  : 'text-red-500'
              }`}
            >
              {isActive
                ? applicationData.startDate > current
                  ? '진행중인'
                  : '진행전'
                : '마감된'}
            </span>{' '}
            지원서입니다.
          </div>
          <span className="text-sm font-medium text-gray-500 md:font-semibold">
            {applicationData.startDate?.slice(2).replaceAll('-', '.')} ~
            {applicationData.endDate?.slice(2).replaceAll('-', '.')}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <button
            onClick={handleRegister}
            className="hidden rounded-xl bg-blue-100 font-bold text-blue-500 hover:bg-blue-200 md:block md:px-7 md:py-3.5 md:text-lg"
          >
            명단 연동하기
          </button>
          <Link
            href={`/apply/${id}/email`}
            className="hidden rounded-xl bg-green-100 font-bold text-green-500 hover:bg-green-200 md:block md:px-7 md:py-3.5 md:text-lg"
          >
            이메일 전송하기
          </Link>
        </div>
      </div>

      {applicationData.hasInterview ? (
        <Tabs TabMenus={ClubTabMenus} tabContext="myClub" />
      ) : (
        <ApplicantList data={applicationData.formApplications ?? []} />
      )}
      <Link href={`/apply/${id}/edit`}>
        <button className="fixed bottom-10 right-5 flex h-12 items-center justify-center rounded-[100px] bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600 md:bottom-20 md:right-20 md:px-10 md:py-4">
          지원서 양식 관리
        </button>
      </Link>
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeButton={false}
        closeModal={closeModal}
      >
        <AlertDialog onConfirm={handleDelete} onCancel={closeModal} />
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id,
    },
  };
};
