import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';

import AdminScore from '@/components/common/AdminScore';
import ClubScore from '@/components/common/ClubScore';

import { ROLE_TYPE } from '@/constants/text';

type ScoreProps = {
  clubId: number;
};
export default function Index({ clubId }: ScoreProps) {
  const [{ role }] = useCookies(['role', 'token']);

  const isAdmin = role === ROLE_TYPE.ROLE_ADMIN;
  return <> {isAdmin ? <AdminScore clubId={clubId} /> : <ClubScore />};</>;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      clubId: id,
    },
  };
};
