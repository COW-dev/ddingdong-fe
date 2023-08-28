import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Clean from '@/assets/clean.svg';
import Dot from '@/assets/dot.svg';
import People from '@/assets/people.svg';
import Report from '@/assets/report.svg';
import Report2 from '@/assets/report2.svg';
import AdminScore from '@/components/common/AdminScore';
import ClubScore from '@/components/common/ClubScore';
import Heading from '@/components/common/Heading';
import History from '@/components/common/History';
import Modal from '@/components/common/Modal';
import ScoreCategory from '@/components/common/ScoreCategory';
import CreateScore from '@/components/modal/score/CreateScore';
import { ROLE_TYPE } from '@/constants/text';
import { useAllScore } from '@/hooks/api/score/useAllScore';
import { useMyScore } from '@/hooks/api/score/useMyScore';
import useModal from '@/hooks/common/useModal';
import { ScoreDetail } from '@/types/score';

type ScoreProps = {
  clubId: number;
};
export default function Index({ clubId }: ScoreProps) {
  const [{ role }] = useCookies(['role', 'token']);

  const isAdmin = role === ROLE_TYPE.ROLE_ADMIN;
  return (
    <>
      <Heading>동아리 점수 관리하기</Heading>
      {isAdmin ? <AdminScore clubId={clubId} /> : <ClubScore />}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      clubId: id,
    },
  };
};
