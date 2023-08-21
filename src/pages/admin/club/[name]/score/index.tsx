import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import History from '@/components/common/History';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [{ role, token }] = useCookies(['token', 'role']);

  return (
    <div className="m-auto w-5/6">
      {role === ROLE_TYPE.ROLE_ADMIN ? (
        <Heading>동아리 점수 관리하기</Heading>
      ) : (
        <Heading>동아리 점수 확인하기</Heading>
      )}
      <History />
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
