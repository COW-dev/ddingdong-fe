import { Body3, Button, DoubleButton, Flex, Modal, Title3 } from '@dds/shared';

type CalendarEventDeleteConfirmProps = {
  readonly isPending: boolean;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
};

export function CalendarEventDeleteConfirm({
  isPending,
  onCancel,
  onConfirm,
}: CalendarEventDeleteConfirmProps) {
  return (
    <Modal
      isOpen
      closeModal={onCancel}
      closeOnOutsideClick={!isPending}
      contentClassName="rounded-2xl p-6 md:p-10"
    >
      <Flex
        dir="col"
        alignItems="center"
        className="w-[80vw] max-w-sm gap-6 text-center"
      >
        <Flex dir="col" className="gap-2">
          <Title3 as="h2">이벤트를 삭제하시겠습니까?</Title3>
          <Body3 className="text-gray-400">
            삭제 후엔 다시 복구할 수 없습니다.
          </Body3>
        </Flex>
        <DoubleButton
          left={
            <Button
              type="button"
              variant="tertiary"
              size="full"
              disabled={isPending}
              onClick={onCancel}
            >
              취소하기
            </Button>
          }
          right={
            <Button
              type="button"
              variant="primary"
              color="red"
              size="full"
              isLoading={isPending}
              onClick={onConfirm}
            >
              삭제하기
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
