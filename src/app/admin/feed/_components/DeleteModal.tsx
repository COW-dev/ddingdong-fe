import {
  Body1,
  Body2,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

type DeleteModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onDelete: VoidFunction;
};
export function DeleteModal({ isOpen, onClose, onDelete }: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose} className="z-[110]">
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="w-full py-2">
          <Body1 weight="bold">댓글을 삭제하시겠습니까?</Body1>
          <Caption1 weight="medium" className="text-gray-500">
            삭제된 댓글은 다시 복구할 수 없습니다.
          </Caption1>
        </Flex>

        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={onClose}>
              <Body2>취소</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="red"
              size="full"
              onClick={onDelete}
            >
              <Body2>삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
