'use client';

import {
  Button,
  DoubleButton,
  Flex,
  Modal,
  Caption1,
} from 'ddingdong-design-system';

import {
  useRoundResultModal,
  type RoundResultModalAction,
} from '../../hooks/useRoundResultModal';
import brokenHeartImage from '../../Img/broken_heart.webp';
import emptyHeartImage from '../../Img/empty_heart.webp';
import filledHeartImage from '../../Img/filled_heart.webp';

import { Body1, Caption2, Caption3 } from './EventTypography';

export type { RoundResultModalAction };

type Props = {
  isOpen: boolean;
  onClose: () => void;
  result: { stage: number; success: boolean };
  onAction: (action: RoundResultModalAction) => void;
};

export type RoundResultModalProps = Props;

export function RoundResultModal({ isOpen, onClose, result, onAction }: Props) {
  const {
    content,
    filledCount,
    brokenCount,
    emptyCount,
    quitLabel,
    rightLabel,
    rightAction,
    stage,
    success,
  } = useRoundResultModal(result);

  if (!content) return null;

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
            {content.title}
          </Body1>
          {content.lines.map((line, i) => (
            <Caption2 weight="normal" key={i} className="text-gray-600">
              {line}
            </Caption2>
          ))}
        </Flex>

        <Flex alignItems="center" gap={1}>
          {Array.from({ length: filledCount }, (_, i) => (
            <img
              key={`filled-${i}`}
              src={filledHeartImage.src}
              alt="채워진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: brokenCount }, (_, i) => (
            <img
              key={`broken-${i}`}
              src={brokenHeartImage.src}
              alt="깨진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: emptyCount }, (_, i) => (
            <img
              key={`empty-${i}`}
              src={emptyHeartImage.src}
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
