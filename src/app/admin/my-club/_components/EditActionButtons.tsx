'use client';

import { Body3, Button, DoubleButton } from 'ddingdong-design-system';

type EditActionButtonsProps = {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export function EditActionButtons({
  isEditing,
  onEdit,
  onCancel,
  onSubmit,
}: EditActionButtonsProps) {
  if (isEditing) {
    return (
      <div>
        <DoubleButton
          left={
            <Button variant="tertiary" size="sm" onClick={onCancel}>
              <Body3>취소</Body3>
            </Button>
          }
          right={
            <Button
              variant="secondary"
              color="blue"
              size="sm"
              onClick={onSubmit}
            >
              <Body3>확인</Body3>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <Button variant="secondary" color="blue" size="md" onClick={onEdit}>
      <Body3>정보 수정하기</Body3>
    </Button>
  );
}
