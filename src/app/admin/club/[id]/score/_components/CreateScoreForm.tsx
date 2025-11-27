'use client';
import { ApiError } from 'next/dist/server/api-utils';

import { useState } from 'react';

import { Body3, Button, Flex, Input } from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { useCreateScore } from '@/app/_api/mutations/score';

export function CreateScoreForm({
  scoreCategory,
  clubId,
}: {
  scoreCategory: string;
  clubId: number;
}) {
  const { mutate } = useCreateScore(clubId);

  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!/^\d*\.?\d*$/.test(amount))
      return toast.error('점수는 숫자형식으로 입력해주세요.');

    mutate(
      { scoreCategory, reason, amount: Number(amount) },
      {
        onSuccess: () => {
          toast.success('점수를 추가했어요.');
        },
        onError: (error: Error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-2">
      <Body3>점수 등록</Body3>
      <Flex gap={2}>
        <Input
          name="reason"
          value={reason}
          onClickReset={() => setReason('')}
          placeholder="사유를 입력해주세요."
          onChange={(e) => setReason(e.target.value)}
        />
        <Input
          name="score"
          value={amount}
          placeholder="점수를 입력해주세요."
          onChange={(e) => setAmount(e.target.value)}
          onClickReset={() => setAmount('')}
        />
      </Flex>
      <Button variant="primary" color="blue" onClick={handleSubmit}>
        점수 추가하기
      </Button>
    </form>
  );
}
