'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { PropsWithChildren } from 'react';

import { useSuspenseQueries } from '@tanstack/react-query';
import {
  usePortal,
  DoubleButton,
  Button,
  Body2,
  Flex,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useDeleteReport } from '@/app/_api/mutations/report';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';

import { DeleteModal } from './DeleteModal';

export function EditButton({ term }: { term: number }) {
  const [{ data: currentTerm }, { data: myClubData }] = useSuspenseQueries({
    queries: [reportQueryOptions.currentTerm(), clubQueryOptions.my()],
  });

  const { isOpen, openModal, closeModal } = usePortal();

  const deleteMutation = useDeleteReport();
  const router = useRouter();
  const handleClickDelete = () => {
    deleteMutation.mutate(term);
    router.back();
    toast.success('활동보고서를 삭제했어요.');
  };

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
            <Link href={`/report/${term}/${myClubData.name}/fix`}>
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
        onDeleteReport={handleClickDelete}
      />
    </>
  );
}

function EditButtonContainer({ children }: PropsWithChildren) {
  return <Flex className="m-auto mt-10 w-fit">{children}</Flex>;
}
