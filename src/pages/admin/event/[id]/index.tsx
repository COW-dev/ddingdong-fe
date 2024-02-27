import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { ApplicantDetail } from '@/types/event';
type Props = {
  eventId: number;
};
export default function Index({ eventId }: Props) {
  const [datail, setDetail] = useState<ApplicantDetail>({
    id: eventId,
    name: '',
    sId: 0,
    major: '',
    image: [''],
  });
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      eventId: id,
    },
  };
};
