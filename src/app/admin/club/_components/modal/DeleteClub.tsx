'use client';

import { useState } from 'react';

import { Button, Body3, Input, Flex } from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { useDeleteClub } from '@/app/_api/mutations/club';

import ModalHeader from './ModalHeader';

type Prop = {
  id: number;
  name: string;
  closeModal: () => void;
};

export default function DeleteClub({ id, name, closeModal }: Prop) {
  const { mutate, isPending } = useDeleteClub();
  const [value, setValue] = useState('');

  const canDelete = value.trim() === name;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!canDelete) return;

    mutate(id, {
      onSuccess: () => {
        toast.success('동아리가 삭제되었어요!');
        setValue('');
        closeModal();
      },
      onError: (err) => {
        const msg =
          err instanceof Error && err.message
            ? err.message
            : '동아리 삭제에 실패했어요.';
        toast.error(msg);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="m-auto w-[60vw] max-w-[500px]">
      <ModalHeader title="동아리 삭제하기" onClose={closeModal} />

      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        className="w-full px-2"
      >
        <Flex dir="col" className="w-full gap-4 pb-5">
          <Body3 className="text-gray-400">
            삭제를 위해 동아리명을 입력해주세요.
          </Body3>

          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={name}
            onClickReset={() => setValue('')}
          />
        </Flex>

        <Button
          type="submit"
          color="red"
          variant="primary"
          size="full"
          disabled={isPending || !canDelete}
        >
          동아리 삭제하기
        </Button>
      </Flex>
    </form>
  );
}
