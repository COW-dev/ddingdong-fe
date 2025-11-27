'use client';
import {
  Body1,
  Body2,
  Body3,
  Flex,
  Icon,
  Modal,
  Title3,
  usePortal,
} from 'ddingdong-design-system';

import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';

import { CATEGORY } from '../_consts/category';
import { CategoryContainer } from '../_container/category';
import { getCategoryHistory, getCategoryScore } from '../_utils/filter';

import { CreateScoreForm } from './CreateScoreForm';

type Props = {
  category: keyof typeof CATEGORY;
  score: ScoreDetail;
  clubId?: number;
};

export function Category({ category, score, clubId }: Props) {
  const name = CATEGORY[category].name;
  const { isOpen, openModal, closeModal } = usePortal();

  const history = getCategoryHistory(score, name);
  const totalScore = getCategoryScore(history);

  return (
    <>
      <CategoryContainer onClick={openModal}>
        <Icon name={CATEGORY[category].icon} size={50} color="primary" />
        <Flex dir="col" justifyContent="end" className="text-right">
          <Body1 className="text-blue-500">{name}</Body1>
          <Body2>{parseFloat(totalScore.toFixed(3))}점</Body2>
        </Flex>
      </CategoryContainer>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Flex dir="col" gap={10}>
          {clubId ? (
            <CreateScoreForm
              closeModal={closeModal}
              scoreCategory={category}
              clubId={clubId}
            />
          ) : null}
          <div>
            <Title3>상세내역</Title3>
            <ScoreList history={history} />
          </div>
        </Flex>
      </Modal>
    </>
  );
}

function ScoreList({ history }: { history: ScoreHistory[] }) {
  if (history.length === 0)
    return (
      <Body3 className="w-100 max-w-[80vw] text-center text-gray-300">
        내역이 존재하지 않습니다.
      </Body3>
    );

  return (
    <div>
      {[...history].reverse().map((data, index) => (
        <Flex
          key={index}
          justifyContent="between"
          className="w-100 max-w-[80vw] border-b border-gray-200 py-2"
        >
          <Body3 weight="normal">{data.createdAt.split(' ')[0]}</Body3>
          <Body3 weight="normal">{data.reason}</Body3>
          <Body3 weight="normal">{parseFloat(data.amount.toFixed(3))}점</Body3>
        </Flex>
      ))}
    </div>
  );
}
