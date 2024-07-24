import { GetServerSideProps } from 'next';
import FixDetail from '@/components/fix/FixDetail';

type Props = {
  fixId: number;
};

export default function Index({ fixId }: Props) {
  return <FixDetail id={fixId} />;
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
