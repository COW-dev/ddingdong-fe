'use client';

import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

type DeleteSectionModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onDelete: VoidFunction;
  sectionName: string;
};

export function DeleteSectionModal({
  isOpen,
  onClose,
  onDelete,
  sectionName,
}: DeleteSectionModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="w-full py-2">
          <Body1 as="span" className="text-gray-500" weight="bold">
            {sectionName}
          </Body1>
          <Body1>섹션을 삭제하시겠습니까?</Body1>
        </Flex>

        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={onClose}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="red"
              size="full"
              onClick={() => {
                onDelete();
                onClose();
              }}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
