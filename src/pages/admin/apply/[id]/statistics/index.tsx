import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import LeftArrow2 from '@/assets/leftArrow2.svg';
import QuestionList from '@/components/apply/QuestionList';
import StatisticsIntro from '@/components/apply/StatisticsIntro';
import { useApplyStatistics } from '@/hooks/api/apply/useApplyStatistics';

type Props = {
  applyId: number;
};

export default function Index({ applyId }: Props) {
  const [{ token }] = useCookies(['token']);
  const { data } = useApplyStatistics(applyId, token);

  return (
    <>
      <div className="my-7 flex items-center md:my-11">
        <Link href="/fix">
          <Image
            src={LeftArrow2}
            alt="back"
            width={25}
            height={25}
            className="md:w-[32px]"
          />
        </Link>
        <h1 className="ml-1 text-2xl font-bold md:ml-2 md:text-4xl">
          지원서 통계
        </h1>
      </div>
      <h1 className="my-4 text-xl font-bold md:text-2xl">
        총 지원자
        <span className="ml-1 text-blue-500">{data?.data.totalCount}</span>명
      </h1>
      <StatisticsIntro applyId={applyId} />
      <QuestionList applyId={applyId} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      applyId: id,
    },
  };
};
