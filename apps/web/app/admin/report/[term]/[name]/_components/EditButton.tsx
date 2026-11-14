'use client';
import Link from 'next/link';

import React, { PropsWithChildren } from 'react';

import { usePortal, DoubleButton, Button, Body2, Flex } from '@dds/shared';
import { useSuspenseQueries } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useDeleteReport } from '@/_api/mutations/report';
import { clubQueryOptions } from '@/_api/queries/club';
import { reportQueryOptions } from '@/_api/queries/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';
import { DeleteModal } from '@/admin/report/_components/DeleteModal';

export function EditButton({ term }: { term: number }) {
  const [{ data: currentTerm }, { data: myClubData }] = useSuspenseQueries({
    queries: [reportQueryOptions.currentTerm(), clubQueryOptions.my()],
  });

  const { isOpen, openModal, closeModal } = usePortal();

  const deleteMutation = useDeleteReport();
  // 삭제 후 /report 이동은 useDeleteReport의 onSuccess가 처리
  const handleClickDelete = () => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(term, {
      onSuccess: () => toast.success(REPORT_MESSAGE.deleteSuccess),
      onSettled: closeModal,
    });
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
        isPending={deleteMutation.isPending}
      />
    </>
  );
}

function EditButtonContainer({ children }: PropsWithChildren) {
  return <Flex className="m-auto mt-10 w-fit">{children}</Flex>;
}
