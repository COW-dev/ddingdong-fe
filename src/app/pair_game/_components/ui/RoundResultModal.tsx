'use client';

import {
  Body1,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

import {
  useRoundResultModal,
  type RoundResultModalAction,
} from '../../_hooks/useRoundResultModal';

const brokenHeartImageSrc = '/pair_game/broken_heart.webp';
const emptyHeartImageSrc = '/pair_game/empty_heart.webp';
const filledHeartImageSrc = '/pair_game/filled_heart.webp';

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
        className="w-full max-w-96 px-4 md:max-w-md"
      >
        <Flex dir="col" alignItems="center" className="text-center">
          <span className="border-game-primary text-game-primary mb-2 inline-flex rounded-full border bg-white px-3 py-1">
            <Caption1
              as="span"
              className="font-school-safety text-game-primary"
            >
              {success ? `${stage}단계 클리어` : `${stage}단계 실패`}
            </Caption1>
          </span>
          <Body1
            weight="bold"
            className="font-school-safety py-1 text-gray-600"
          >
            {content.title}
          </Body1>
          {content.lines.map((line: string, i: number) => (
            <Caption1
              weight="normal"
              key={i}
              className="font-school-safety text-gray-600"
            >
              {line}
            </Caption1>
          ))}
        </Flex>

        <Flex alignItems="center" gap={1}>
          {Array.from({ length: filledCount }, (_, i) => (
            <img
              key={`filled-${i}`}
              src={filledHeartImageSrc}
              alt="채워진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: brokenCount }, (_, i) => (
            <img
              key={`broken-${i}`}
              src={brokenHeartImageSrc}
              alt="깨진 하트"
              {...heartImageProps}
            />
          ))}
          {Array.from({ length: emptyCount }, (_, i) => (
            <img
              key={`empty-${i}`}
              src={emptyHeartImageSrc}
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
