import { Body2, Button, DoubleButton } from 'ddingdong-design-system';

type EmailActionButtonsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export function EmailActionButtons({
  onCancel,
  onSubmit,
  isSubmitting = false,
}: EmailActionButtonsProps) {
  return (
    <DoubleButton
      className="m-auto w-fit p-6"
      left={
        <Button
          variant="tertiary"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <Body2 weight="bold">취소</Body2>
        </Button>
      }
      right={
        <Button
          variant="primary"
          color="blue"
          size="lg"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          <Body2 weight="bold">전송하기</Body2>
        </Button>
      }
    />
  );
}
