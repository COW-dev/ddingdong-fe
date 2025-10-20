import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

type DeleteModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  onDeleteReport: VoidFunction;
};

export function DeleteModal({
  isOpen,
  closeModal,
  onDeleteReport,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
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
