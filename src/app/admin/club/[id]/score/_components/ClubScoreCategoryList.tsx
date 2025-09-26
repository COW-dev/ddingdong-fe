'use client';

import { useState } from 'react';

import { Modal } from 'ddingdong-design-system';

import { ScoreHistory } from '@/app/_api/types/score';
import ScoreClubCategory from '@/app/admin/club/[id]/score/_components/ScoreClubCategory';
import { SCORE_TYPE } from '@/constants/score';

import ViewScore from './ViewScore';

type Props = {
  getCategoryData: (categoryName: string) => ScoreHistory[];
};

export default function ClubScoreCategoryList({ getCategoryData }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string>('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  function calculateTotalScore(category: ScoreHistory[]): number {
    return category.reduce((acc, cur) => acc + cur.amount, 0);
  }

  function handleOpenModal(category: string) {
    setCategory(category);
    openModal();
  }
  return (
    <div className="my-4 flex w-full flex-col items-center md:grid md:h-60 md:grid-cols-3 md:gap-4">
      {Object.entries(SCORE_TYPE).map(([, { icon, category }], index) => (
        <div
          key={`category-${index}`}
          onClick={() => handleOpenModal(category)}
          className="mb-5 flex w-full cursor-pointer justify-between rounded-lg border-2 border-neutral-100 shadow-md md:mb-0 md:h-30 lg:flex-row"
        >
          <ScoreClubCategory
            key={category}
            scoreCategory={category}
            icon={icon}
            amount={calculateTotalScore(getCategoryData(category))}
          />
        </div>
      ))}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ViewScore history={getCategoryData(category)} />
      </Modal>
    </div>
  );
}
