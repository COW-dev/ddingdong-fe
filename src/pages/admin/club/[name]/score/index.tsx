import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Clean from '@/assets/clean.svg';
import Dot from '@/assets/dot.svg';
import People from '@/assets/people.svg';
import Report from '@/assets/report.svg';
import Report2 from '@/assets/report2.svg';
import Heading from '@/components/common/Heading';
import History from '@/components/common/History';
import ScoreCategory from '@/components/common/ScoreCategory';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [{ role, token }] = useCookies(['token', 'role']);

  return (
    <div className="m-auto md:w-5/6">
      {role === ROLE_TYPE.ROLE_ADMIN ? (
        <Heading>동아리 점수 관리하기</Heading>
      ) : (
        <Heading>동아리 점수 확인하기</Heading>
      )}
      <History />
      <div className="flex h-60 w-full flex-row items-center justify-between space-x-5 p-4">
        <ScoreCategory category="청소" icon={Clean} amount={30} />
        <ScoreCategory category="활동보고서" icon={Report} amount={30} />
      </div>
      <div className="flex h-60 w-full flex-row items-center justify-between space-x-5 p-4">
        <ScoreCategory category="전동대회" icon={People} amount={30} />
        <ScoreCategory category="총동연 사업 참여" icon={Report2} amount={30} />
        <ScoreCategory category="가산점/감점" icon={Dot} amount={30} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.query;
  return {
    props: {
      name: name,
    },
  };
};
