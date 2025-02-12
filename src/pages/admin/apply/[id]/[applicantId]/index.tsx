import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import LeftArrow from '@/assets/leftArrow2.svg';
import ApplicantInfo from '@/components/apply/ApplicantInfo';
import ApplyResult from '@/components/apply/ApplyResult';
import Loading from '@/components/loading/Loading';
import { STATUS_TYPE } from '@/constants/apply';
import { useApplicantInfo } from '@/hooks/api/apply/useApplicantInfo';
import { useUpdateApplicantStatus } from '@/hooks/api/apply/useUpdateApplicantStatus';
import { ApplicantStatus } from '@/types/apply';
import { getNextStatus } from '@/utils/filter';

type Props = {
  id: number;
  applicantId: number;
};

export default function Index({ id, applicantId }: Props) {
  const [{ token }] = useCookies(['token']);
  const { data: data, isLoading } = useApplicantInfo(id, applicantId, token);
  const applicantData = data?.data;
  const mutation = useUpdateApplicantStatus();

  if (isLoading)
    return (
      <div className="flex h-full w-full justify-center p-6">
        <Loading />
      </div>
    );

  if (!applicantData) {
    return (
      <div className="flex h-full w-full justify-center p-6">
        <h1>지원자 정보가 존재하지 않아요.</h1>
      </div>
    );
  }

  const handleUpdateStatus = (isPass: boolean) => {
    const nextStatus = getNextStatus(
      applicantData.status as ApplicantStatus,
      applicantData.hasInterview,
      isPass,
    );

    mutation.mutate({
      formId: id,
      applicationIds: [applicantId],
      status: nextStatus,
      token: token,
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-7 flex items-center justify-between border-b border-gray-300 pb-3">
        <div className="flex flex-row items-center ">
          <Link href={`/apply/${id}`} className="flex items-center">
            <Image
              src={LeftArrow}
              alt="back"
              width={40}
              height={40}
              className="mb-1 size-6 md:mb-0.5 md:size-9"
            />
            <h1 className="ml-3 text-2xl font-bold md:text-4xl">
              {applicantData?.name}
            </h1>
            <div
              className={`${
                STATUS_TYPE[applicantData.status].backgroundColor
              } ${
                STATUS_TYPE[applicantData.status].color
              } ml-2 rounded-lg p-1 text-xs font-semibold md:ml-4 md:px-2 md:py-[5px] md:text-sm`}
            >
              {STATUS_TYPE[applicantData.status].statusText}
            </div>
          </Link>
        </div>
        <span className="text-base md:text-lg">
          제출일시{' '}
          {`${
            applicantData?.submittedAt.replaceAll('-', '.').split('T')[0]
          }  ${applicantData?.submittedAt.split('T')[1].replaceAll('-', '.')}`}
        </span>
      </div>
      <ApplicantInfo {...applicantData} />
      {applicantData?.formFieldAnswers
        ?.sort((a, b) => a.order - b.order)
        ?.map((answer) => (
          <ApplyResult key={answer.fieldId} {...answer} />
        ))}
      <div className="mt-3 flex items-center justify-center gap-3 text-lg font-bold">
        <button
          onClick={() => handleUpdateStatus(true)}
          className="rounded-xl bg-blue-100 px-[60px] py-[14px] text-blue-500 hover:bg-blue-200"
        >
          합격
        </button>
        <button
          onClick={() => handleUpdateStatus(false)}
          className="rounded-xl bg-red-100 px-[60px] py-[14px] text-red-500 hover:bg-red-200"
        >
          불합격
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, applicantId } = context.query;
  return {
    props: {
      id: id,
      applicantId: applicantId,
    },
  };
};
