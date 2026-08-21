import { Body2, Button, DoubleButton } from '@dds/shared';

type CalendarEventModalActionsProps = {
  readonly mode: 'create' | 'edit';
  readonly isPending: boolean;
  readonly isSaving: boolean;
  readonly canSave: boolean;
  readonly onClose: () => void;
  readonly onDelete: () => void;
};

export function CalendarEventModalActions({
  mode,
  isPending,
  isSaving,
  canSave,
  onClose,
  onDelete,
}: CalendarEventModalActionsProps) {
  return (
    <DoubleButton
      left={
        <Button
          type="button"
          variant={mode === 'edit' ? 'secondary' : 'tertiary'}
          color={mode === 'edit' ? 'red' : undefined}
          size="full"
          disabled={isPending}
          onClick={mode === 'edit' ? onDelete : onClose}
        >
          <Body2>{mode === 'edit' ? '삭제하기' : '취소'}</Body2>
        </Button>
      }
      right={
        <Button
          type="submit"
          variant="primary"
          color="blue"
          size="full"
          disabled={!canSave || isSaving || isPending}
          isLoading={isSaving}
        >
          <Body2 weight="semibold">
            {mode === 'create' ? '생성하기' : '수정하기'}
          </Body2>
        </Button>
      }
    />
  );
}
