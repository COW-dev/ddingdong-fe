import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ScoreList from '@/components/score/ScoreList';
import { ROLE_TYPE } from '@/constants/text';
import { useNewScore } from '@/hooks/api/score/useNewScore';
import { ScoreDetail } from '@/types/score';

type Prop = {
  scoreCategory: string;
  parseList: ScoreDetail[];
  closeModal: () => void;
};

export default function CreateScore({
  scoreCategory,
  parseList,
  closeModal,
}: Prop) {
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;

  return (
    <div>
      <ScoreList parseList={parseList} />
    </div>
  );
}
