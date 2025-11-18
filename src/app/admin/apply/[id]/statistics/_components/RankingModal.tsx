import { ChartItem } from '@/app/_api/types/apply';
import { Caption1, Flex, Modal } from 'ddingdong-design-system';

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
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        {departmentRanks.map((item, index) => {
          return (
            <Flex gap={1} className="m-1 list-none p-1" key={index}>
              <Caption1>
                {index + 1}. {item.label}
              </Caption1>
            </Flex>
          );
        })}
      </Flex>
    </Modal>
  );
}
