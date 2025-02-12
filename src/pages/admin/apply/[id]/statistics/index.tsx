import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';
import LeftArrow2 from '@/assets/leftArrow2.svg';
import StatisticsIntro from '@/components/apply/StatisticsIntro';
import { useApplyStatistics } from '@/hooks/api/apply/useApplyStatistics';
import Question from '@/pages/test/question';
import { useCookies } from 'react-cookie';
import { ApplyQuestion } from '@/components/ui/bar-chart';

type Props = {
  applyId: number;
};

export default function Index({ applyId }: Props) {
  const [{ token }] = useCookies(['token']);
  const { data } = useApplyStatistics(applyId, token);
  // const data = MOCK_ApplyStatistics;
  console.log(data?.data);
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
      <div>
        {data?.data.fieldStatistics.fields?.map((question: ApplyQuestion) => {
          return <Question data={question} key={question.id} />;
        })}
      </div>
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
