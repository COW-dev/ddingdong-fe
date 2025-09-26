'use client';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Title1 } from 'ddingdong-design-system';

import { ScoreQueryOptions } from '@/app/_api/queries/score';
import { useCookie } from '@/app/_api/useCookie';
import History from '@/app/admin/club/[id]/score/_components/History';
import { ScoreDetail, ScoreHistory } from '@/types/score';

import ClubScoreCategoryList from './ClubScoreCategoryList';

export default function ClubScore() {
  const { data } = useQuery(ScoreQueryOptions.all());
  const { cookie } = useCookie();
  cookie.role;

  const [scoreData, setScoreData] = useState<ScoreDetail>({
    totalScore: 0,
    scoreHistories: [],
  });

  useEffect(() => {
    if (data) {
      setScoreData(data);
    }
  }, [data]);

  function getCategoryData(categoryName: string): ScoreHistory[] {
    return scoreData.scoreHistories.filter(
      (item) => item.scoreCategory === categoryName,
    );
  }

  return (
    <>
      <Title1>동아리 점수 확인하기</Title1>
      <History
        totalScore={scoreData.totalScore}
        scoreHistories={scoreData.scoreHistories}
      />

      <ClubScoreCategoryList getCategoryData={getCategoryData} />
    </>
  );
}
