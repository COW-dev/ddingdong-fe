import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import Modal from '@/components/common/Modal';
import History from '@/components/score/History';
import ScoreClubCategory from '@/components/score/ScoreClubCategory';
import { SCORE_TYPE } from '@/constants/score';
import { useMyScore } from '@/hooks/api/score/useMyScore';
import useModal from '@/hooks/common/useModal';
import { ScoreDetail, ScoreHistory } from '@/types/score';
import ViewScore from '../modal/score/ViewScore';

export default function ClubScore() {
  const [category, setCategory] = useState<string>('');
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [{ token }] = useCookies(['role', 'token']);
  const [scoreData, setScoreData] = useState<ScoreDetail>({
    totalScore: 0,
    scoreHistories: [],
  });

  function handleOpenModal(category: string) {
    setCategory(category);
    openModal();
  }
  const { data } = useMyScore(token);

  useEffect(() => {
    if (data) setScoreData(data.data);
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
      <Heading>동아리 점수 확인하기</Heading>
      <History
        totalScore={scoreData.totalScore}
        scoreHistories={scoreData.scoreHistories}
      />
      <div className=" my-4 flex w-full flex-col items-center md:grid md:h-60 md:grid-cols-3 md:gap-4 ">
        {Object.entries(SCORE_TYPE).map(([, { icon, category }], index) => (
          <div
            onClick={() => handleOpenModal(category)}
            className="mb-5 flex w-full cursor-pointer justify-between rounded-lg border-2 shadow-md md:mb-0 md:h-30 lg:flex-row"
            key={`category-${index}`}
          >
            <ScoreClubCategory
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
        <ViewScore history={getCategoryData(category)} />
      </Modal>
    </>
  );
}
