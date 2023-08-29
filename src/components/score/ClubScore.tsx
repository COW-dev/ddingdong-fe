import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Clean from '@/assets/clean.svg';
import Dot from '@/assets/dot.svg';
import People from '@/assets/people.svg';
import Report from '@/assets/report.svg';
import Report2 from '@/assets/report2.svg';
import Heading from '@/components/common/Heading';
import History from '@/components/score/History';
import ScoreCategory from '@/components/score/ScoreCategory';
import { ROLE_TYPE } from '@/constants/text';
import { useMyScore } from '@/hooks/api/score/useMyScore';
import { ScoreDetail } from '@/types/score';
import ScoreClubCategory from './ScoreClubCategory';
const init = [
  {
    scoreCategory: '',
    reason: '',
    createdAt: '',
    amount: 0,
    remainingScore: 0,
  },
];
export default function ClubScore() {
  const key = [
    { icon: Report, category: '동아리 활동 보고서' },
    { icon: Clean, category: '청소' },
    { icon: People, category: '전동대회' },
    { icon: Report2, category: '총동연 사업 참여' },
    { icon: Dot, category: '가산점/감점' },
  ];
  const parseList = [];
  const [{ role, token }] = useCookies(['role', 'token']);
  const isAdmin = role === ROLE_TYPE.ROLE_ADMIN;
  const isClub = role === ROLE_TYPE.ROLE_CLUB;
  const [scoreData, setScoreData] = useState<ScoreDetail[]>(init);

  const {
    data: { data },
  } = useMyScore(token);

  useEffect(() => {
    if (data) setScoreData(data);
  }, [data]);
  function Category(categoryName: string) {
    const category: ScoreDetail[] = [];
    {
      scoreData &&
        scoreData.map((item) => {
          if (item.scoreCategory === categoryName) category.push(item);
        });
    }
    const score = totalScore(category);
    parseList.push({ category: category, score: score });
    return category;
  }
  function totalScore(category: Array<ScoreDetail>) {
    const total = category.reduce((acc, cur) => acc + cur.amount, 0);
    return total;
  }

  return (
    <div className="">
      <Heading>동아리 점수 확인하기</Heading>
      <History scoreData={scoreData} />
      <div className="mb-3 flex w-full flex-col items-center p-5 md:h-50 md:flex-row md:space-x-5 md:p-4">
        {key.map(({ icon, category }) => (
          <ScoreClubCategory
            key={category}
            scoreCategory={category}
            icon={icon}
            amount={totalScore(Category(category))}
            parseList={Category(category)}
          />
        ))}
      </div>
    </div>
  );
}
