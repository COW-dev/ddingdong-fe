'use client';

import {
  Button,
  DoubleButton,
  Flex,
  Modal,
  Caption1,
} from 'ddingdong-design-system';

import { HEART_MODAL_CONTENT } from '../../_utils/heartModalContent';
import brokenHeartImage from '../../Img/broken_heart.png';
import emptyHeartImage from '../../Img/empty_heart.png';
import filledHeartImage from '../../Img/filled_heart.png';

import { Body1, Caption2, Caption3 } from './Typography';

const brokenHeartSrc =
  typeof brokenHeartImage === 'string'
    ? brokenHeartImage
    : brokenHeartImage.src;
const emptyHeartSrc =
  typeof emptyHeartImage === 'string' ? emptyHeartImage : emptyHeartImage.src;
const filledHeartSrc =
  typeof filledHeartImage === 'string'
    ? filledHeartImage
    : filledHeartImage.src;

export type RoundResultModalAction = 'nextStage' | 'quit' | 'retry' | 'submit';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  result: { stage: number; success: boolean };
  onAction: (action: RoundResultModalAction) => void;
};

export type RoundResultModalProps = Props;

export function RoundResultModal({ isOpen, onClose, result, onAction }: Props) {
  const { stage, success } = result;
  const content = HEART_MODAL_CONTENT[stage];
  if (!content) return null;

  const { title, lines } = success ? content.success : content.fail;
  const filledCount = success ? stage : stage - 1;
  const brokenCount = success ? 0 : 1;
  const emptyCount = 5 - filledCount - brokenCount;

  const isStage5Success = stage === 5 && success;
  const quitLabel = isStage5Success ? '나가기' : '그만하기';

  let rightLabel: string;
  let rightAction: RoundResultModalAction;
  if (isStage5Success) {
    rightLabel = '상품 응모하기';
    rightAction = 'submit';
  } else if (success) {
    rightLabel = '다음단계';
    rightAction = 'nextStage';
  } else {
    rightLabel = '다시 도전하기';
    rightAction = 'retry';
  }

  const heartImageProps = {
    className:
      'h-[30px] w-[30px] md:h-[35px] md:w-[35px] object-contain transition-all',
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose} closeOnOutsideClick={false}>
      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        gap={4}
        className="w-full max-w-xs px-4 md:max-w-md"
      >
        <Flex dir="col" alignItems="center" className="text-center">
          <span className="border-game-primary text-game-primary mb-2 inline-flex rounded-full border bg-white px-3 py-1">
            <Caption3 as="span" className="text-game-primary">
              {success ? `${stage}단계 클리어` : `${stage}단계 실패`}
            </Caption3>
          </span>
          <Body1 weight="bold" className="py-1 text-gray-600">
            {title}
          </Body1>
          {lines.map((line, i) => (
            <Caption2 weight="normal" key={i} className="text-gray-600">
              {line}
            </Caption2>
          ))}
        </Flex>

        <Flex alignItems="center" gap={1}>
          {Array.from({ length: filledCount }, (_, i) => (
            <img
              key={`filled-${i}`}
              src={filledHeartSrc}
              alt="채워진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: brokenCount }, (_, i) => (
            <img
              key={`broken-${i}`}
              src={brokenHeartSrc}
              alt="깨진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: emptyCount }, (_, i) => (
            <img
              key={`empty-${i}`}
              src={emptyHeartSrc}
              alt="빈 하트"
              {...heartImageProps}
            />
          ))}
        </Flex>

        <DoubleButton
          left={
            <Button
              variant="tertiary"
              size="full"
              onClick={() => onAction('quit')}
            >
              <Caption1 as="span" weight="bold">
                {quitLabel}
              </Caption1>
            </Button>
          }
          right={
            <Button
              variant="primary"
              size="full"
              className="bg-game-primary"
              onClick={() => onAction(rightAction)}
            >
              <Caption1 weight="bold" className="whitespace-nowrap">
                {rightLabel}
              </Caption1>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
