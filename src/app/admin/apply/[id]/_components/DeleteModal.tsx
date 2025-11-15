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
  title: string;
  isOpen: boolean;
  onClose: VoidFunction;
  onDelete: VoidFunction;
};

export function DeleteModal({
  title,
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="box-border w-full py-2">
          <Flex dir="col" alignItems="center">
            <Body1
              as="span"
              className="max-w-full truncate text-center text-gray-500"
              weight="bold"
            >
              {title}을{' '}
            </Body1>
            <Body1>삭제하시겠습니까?</Body1>
          </Flex>
          <Caption1 className="text-gray-500">지원 폼이 삭제되요.</Caption1>
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
              onClick={onDelete}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
