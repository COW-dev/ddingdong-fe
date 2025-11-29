'use client';
import { useRouter } from 'next/navigation';

import { PropsWithChildren } from 'react';

import { DoubleButton, Button, Body2, Flex } from 'ddingdong-design-system';

type Props = {
  disabled?: boolean;
  isEditMode: boolean;
};

export function EditButton({ disabled = false, isEditMode }: Props) {
  const router = useRouter();
  return (
    <EditButtonContainer>
      {isEditMode ? (
        <DoubleButton
          left={
            <Button variant="tertiary" onClick={() => router.back()}>
              <Body2>취소</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              type="submit"
              disabled={disabled}
            >
              <Body2>수정하기</Body2>
            </Button>
          }
        />
      ) : (
        <Button
          variant="secondary"
          type="submit"
          color="blue"
          disabled={disabled}
        >
          <Body2>생성하기</Body2>
        </Button>
      )}
    </EditButtonContainer>
  );
}

function EditButtonContainer({ children }: PropsWithChildren) {
  return (
    <Flex justifyContent="center" className="m-auto mt-6 w-fit">
      {children}
    </Flex>
  );
}
