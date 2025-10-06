import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';

type DeleteModalProps = {
  title: string;
  isOpen: boolean;
  closeModal: VoidFunction;
  onDeleteFaq: VoidFunction;
};

export function DeleteModal({
  title,
  isOpen,
  closeModal,
  onDeleteFaq,
}: DeleteModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="box-border w-full py-2">
          <Body1
            as="span"
            className="max-w-full truncate text-center text-gray-500"
            weight="bold"
          >
            {title}를
          </Body1>
          <Body1>삭제하시겠습니까?</Body1>
        </Flex>

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
              onClick={onDeleteFaq}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
