import { GetServerSideProps } from 'next';
import FixDetail from '@/components/fix/FixDetail';

type Props = {
  id: number;
};

export default function Index({ id }: Props) {
  return <FixDetail id={id} />;
}
export const getServerSideProps: GetServerSideProps = async (context: {
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      id: id,
    },
  };
};
