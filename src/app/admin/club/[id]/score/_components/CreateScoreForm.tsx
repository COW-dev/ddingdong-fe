'use client';
import { useState } from 'react';

import {
  Button,
  Flex,
  IconButton,
  Input,
  Title3,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useCreateScore } from '@/app/_api/mutations/score';

export function CreateScoreForm({
  scoreCategory,
  clubId,
  closeModal,
}: {
  scoreCategory: string;
  clubId: number;
  closeModal: () => void;
}) {
  const { mutate } = useCreateScore(clubId);

  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      return toast.error('사유를 입력해주세요.');
    }

    if (!amount.trim()) {
      return toast.error('점수를 입력해주세요.');
    }

    if (!/^-?\d*\.?\d*$/.test(amount)) {
      return toast.error('점수는 숫자형식으로 입력해주세요.');
    }

    const amountNumber = Number(amount);

    mutate(
      { scoreCategory, reason, amount: amountNumber },
      {
        onSuccess: () => {
          toast.success('점수를 추가했어요.');
          setAmount('');
          setReason('');
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
      <Flex justifyContent="between">
        <Title3>점수 등록</Title3>
        <IconButton
          iconName="close"
          color="gray"
          onClick={closeModal}
          size={21}
          type="button"
        />
      </Flex>
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
