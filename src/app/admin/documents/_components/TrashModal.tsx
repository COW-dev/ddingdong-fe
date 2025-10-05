import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

import { Document } from '@/app/_api/types/document';

type TrashModalProps = {
  title: Document['title'];
  isOpen: boolean;
  closeModal: VoidFunction;
  onDelete: VoidFunction;
};

export function TrashModal({
  title,
  isOpen,
  closeModal,
  onDelete,
}: TrashModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="w-full py-2">
          <Body1 as="span" className="text-blue-700" weight="bold">
            {title}
          </Body1>
          <Body1>자료를 삭제하시겠습니까?</Body1>
        </Flex>

        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={() => {
                onDelete();
                closeModal();
              }}
            >
              <Body2 weight="semibold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
