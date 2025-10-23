import {
  usePortal,
  DoubleButton,
  Button,
  Body2,
  Flex,
} from 'ddingdong-design-system';
import { Link } from 'lucide-react';
import React, { PropsWithChildren } from 'react';
import { DeleteModal } from './DeleteModal';
import { useDeleteReport } from '@/app/_api/mutations/report';

export function EditButton({ term }: { term: number }) {
  const currentTerm = { term: 5 };

  const { isOpen, openModal, closeModal } = usePortal();

  const deleteMutation = useDeleteReport();
  return (
    <>
      <EditButtonContainer>
        <DoubleButton
          left={
            <Button
              variant="primary"
              color="red"
              className={`${currentTerm.term !== term && 'hidden'}`}
              onClick={() => openModal()}
            >
              <Body2 weight="bold">삭제</Body2>
            </Button>
          }
          right={
            <Link href={`/report/${term}/${name}/fix`}>
              <Button
                variant="primary"
                color="blue"
                className={`${currentTerm.term !== term && 'hidden'} `}
              >
                <Body2 weight="bold">수정</Body2>
              </Button>
            </Link>
          }
        />
      </EditButtonContainer>
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onDeleteReport={() => deleteMutation.mutate(term)}
      />
    </>
  );
}

function EditButtonContainer({ children }: PropsWithChildren) {
  return <Flex className="m-auto mt-10 w-fit">{children}</Flex>;
}
