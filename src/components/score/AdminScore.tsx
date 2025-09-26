import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import History from '@/app/admin/club/[id]/score/_components/History';
import { SCORE_TYPE } from '@/constants/score';
import { useAllScore } from '@/hooks/api/score/useAllScore';
import useModal from '@/hooks/common/useModal';
import { ScoreDetail, ScoreHistory } from '@/types/score';
import ScoreCategory from './ScoreCategory';
import CreateScore from '../modal/score/CreateScore';

type ScoreProps = {
  clubId: number;
};

export default function AdminScore({ clubId }: ScoreProps) {
  const [{ token }] = useCookies(['role', 'token']);
  const [scoreData, setScoreData] = useState<ScoreDetail>({
    totalScore: 0,
    scoreHistories: [],
  });
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [category, setCategory] = useState<string>('');
  const { data } = useAllScore(token, clubId);

  function handleOpenModal(category: string) {
    setCategory(category);
    openModal();
  }

  useEffect(() => {
    if (data) {
      setScoreData(data.data);
    }
  }, [data]);

  function getCategoryData(categoryName: string): ScoreHistory[] {
    return scoreData.scoreHistories.filter(
      (item) => item.scoreCategory === categoryName,
    );
  }

  function calculateTotalScore(category: ScoreHistory[]): number {
    return category.reduce((acc, cur) => acc + cur.amount, 0);
  }

  return (
    <>
      <Heading>동아리 점수 관리</Heading>
      <History
        totalScore={scoreData.totalScore}
        scoreHistories={scoreData.scoreHistories}
      />
      <div className="my-4 flex w-full flex-col items-center md:grid md:h-60 md:grid-cols-3 md:gap-4">
        {Object.entries(SCORE_TYPE).map(([, { icon, category }], index) => (
          <div
            onClick={() => handleOpenModal(category)}
            className="mb-5 flex w-full cursor-pointer justify-between rounded-lg border-2 shadow-md md:mb-0 md:h-30 lg:flex-row"
            key={`category-${index}`}
          >
            <ScoreCategory
              key={category}
              scoreCategory={category}
              icon={icon}
              amount={calculateTotalScore(getCategoryData(category))}
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
          history={getCategoryData(category)}
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
