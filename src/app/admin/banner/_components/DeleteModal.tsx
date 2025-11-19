'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useDeleteBanner } from '@/app/_api/mutations/banner';
import { bannerQueryOptions } from '@/app/_api/queries/banner';

type Props = {
  id: number;
  isOpen: boolean;
  closeModal: VoidFunction;
};

export function DeleteModal({ id, isOpen, closeModal }: Props) {
  const { data: bannerData } = useSuspenseQuery(bannerQueryOptions.all());
  const { mutate } = useDeleteBanner();

  function handleClickDelete() {
    if (bannerData?.length < 2) {
      closeModal();
      return toast.error('배너는 한개 이상 존재해야해요.');
    }

    mutate(id, {
      onSuccess: () => {
        toast.success('배너가 삭제되었어요.');
      },
      onError: (error: Error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
      },
    });
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="box-border w-full py-2">
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
              onClick={handleClickDelete}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
