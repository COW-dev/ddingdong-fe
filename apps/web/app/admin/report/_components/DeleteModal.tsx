'use client';
import { Body1, Body2, Button, DoubleButton, Flex, Modal } from '@dds/shared';

type Props = {
  isOpen: boolean;
  closeModal: VoidFunction;
  onDeleteReport: VoidFunction;
  isPending?: boolean;
};

export function DeleteModal({
  isOpen,
  closeModal,
  onDeleteReport,
  isPending = false,
}: Props) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] max-w-[380px]"
      >
        <Body1>삭제하시겠습니까?</Body1>
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="red"
              size="full"
              disabled={isPending}
              onClick={onDeleteReport}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
