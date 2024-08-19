import { GetServerSideProps } from 'next';
import { useCookies } from 'react-cookie';
import FixAdminDetail from '@/components/fix/FixAdminDetail';
import FixClubDetail from '@/components/fix/FixClubDetail';
import { ROLE_TYPE } from '@/constants/text';
type Props = {
  fixId: number;
};
export default function Index({ fixId }: Props) {
  const [{ role }] = useCookies(['role']);
  return role === ROLE_TYPE.ROLE_ADMIN ? (
    <FixAdminDetail id={fixId} />
  ) : (
    <FixClubDetail id={fixId} />
  );
}

export const getServerSideProps: GetServerSideProps = async (context: {
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      fixId: id,
    },
  };
};
