import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Clean from '@/assets/clean.svg';
import Dot from '@/assets/dot.svg';
import People from '@/assets/people.svg';
import PlusMinus from '@/assets/plusminus.svg';
import Report from '@/assets/report.svg';
import Report2 from '@/assets/report2.svg';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import History from '@/components/score/History';
import { useAllScore } from '@/hooks/api/score/useAllScore';
import useModal from '@/hooks/common/useModal';
import { ScoreDetail } from '@/types/score';
import ScoreCategory from './ScoreCategory';
import CreateScore from '../modal/score/CreateScore';

type ScoreProps = {
  clubId: number;
};
const init = [
  {
    scoreCategory: '',
    reason: '',
    createdAt: '',
    amount: 0,
    remainingScore: 0,
  },
];
export default function AdminScore({ clubId }: ScoreProps) {
  const key = [
    { icon: Report, category: '동아리 활동 보고서' },
    { icon: Clean, category: '청소' },
    { icon: People, category: '전동대회' },
    { icon: Report2, category: '총동연 사업 참여' },
    { icon: PlusMinus, category: '가산점/감점' },
    { icon: Dot, category: '점수 이월' },
  ];
  const parseList = [];
  const [{ token }] = useCookies(['role', 'token']);
  const [scoreData, setScoreData] = useState<ScoreDetail[]>(init);
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [category, setCategory] = useState<string>('');
  const {
    data: { data },
  } = useAllScore(token, clubId);

  function handleOpenModal(category: string) {
    setCategory(category);
    openModal();
  }

  useEffect(() => {
    if (data) {
      setScoreData(data);
    }
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
    <>
      <Heading>동아리 점수 관리</Heading>
      <History scoreData={scoreData} />
      <div className=" my-4 flex w-full flex-col items-center md:grid md:h-60 md:grid-cols-3 md:gap-4 ">
        {key.map(({ icon, category }, index) => (
          <div
            onClick={() => handleOpenModal(category)}
            className="mb-5 flex w-full cursor-pointer justify-between rounded-lg border-2 shadow-md md:mb-0 md:h-30 lg:flex-row"
            key={`category-${index}`}
          >
            <ScoreCategory
              key={category}
              scoreCategory={category}
              icon={icon}
              amount={totalScore(Category(category))}
              clubId={clubId}
              parseList={Category(category)}
            />
          </div>
        ))}
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={category}
        closeModal={closeModal}
      >
        <CreateScore
          scoreCategory={category}
          parseList={Category(category)}
          closeModal={closeModal}
          clubId={clubId}
        />
      </Modal>
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
