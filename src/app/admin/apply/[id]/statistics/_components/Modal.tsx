import { Body3, Caption1, Flex, Modal } from 'ddingdong-design-system';

import { ChartItem } from '@/app/_api/types/apply';

export function RankingModal({
  isOpen,
  onClose,
  departmentRanks,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  departmentRanks: ChartItem[];
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[380px]">
        <Body3>지원자 수가 가장 많은 학과를 소개해요.</Body3>
        <Flex dir="col" gap={2} className="text-gray-400">
          {departmentRanks.map((item, index) => {
            return (
              <Caption1 key={index}>
                {index + 1}. {item.label} ({item.count}명)
              </Caption1>
            );
          })}
        </Flex>
      </Flex>
    </Modal>
  );
}

export function OptionModal({
  isOpen,
  onClose,
  options,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  options: { count: number; label: string; ratio: number }[];
}) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex dir="col" gap={2} className="w-[80vw] text-gray-400 md:w-[380px]">
        {options.map((option, index) => {
          return (
            <Caption1 key={index}>
              - {option.label} ({option.ratio}%)
            </Caption1>
          );
        })}
      </Flex>
    </Modal>
  );
}
