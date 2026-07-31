import { Body3, Button, Flex } from '@dds/shared';

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
    <Flex justifyContent="between" className="rounded-xl bg-red-50 p-4">
      <Body3 className="text-red-300">이 일정을 삭제할까요?</Body3>
      <Flex className="gap-2">
        <Button type="button" variant="tertiary" size="sm" onClick={onCancel}>
          취소
        </Button>
        <Button
          type="button"
          variant="primary"
          color="red"
          size="sm"
          isLoading={isPending}
          onClick={onConfirm}
        >
          삭제
        </Button>
      </Flex>
    </Flex>
  );
}
