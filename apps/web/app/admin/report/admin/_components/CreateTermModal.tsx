'use client';

import { useRef, useState } from 'react';

import {
  Body2,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Input,
  Modal,
  Title3,
} from '@dds/shared';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import { useCreateTerms } from '@/_api/mutations/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';
import {
  AdminCalendarField,
  toIsoDate,
} from '@/admin/_components/AdminCalendarField';

type Props = {
  isOpen: boolean;
  closeModal: VoidFunction;
};

const TERM_DAYS = 14;

export function CreateTermModal({ isOpen, closeModal }: Props) {
  const { mutate, isPending } = useCreateTerms();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [count, setCount] = useState('1');
  // 닫을 때마다 증가시켜, 이전 모달 세션의 요청 콜백이 새로 열린 모달을 닫지 않게 한다
  const sessionRef = useRef(0);

  const totalTermCount = Number(count);
  const isCountValid =
    Number.isSafeInteger(totalTermCount) && totalTermCount >= 1;

  // 마감일 = 시작일 + 2주 × N − 1일
  const calculatedEndDate =
    startDate && isCountValid
      ? new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + TERM_DAYS * totalTermCount - 1,
        )
      : null;
  const endDate =
    calculatedEndDate &&
    Number.isFinite(calculatedEndDate.getTime()) &&
    calculatedEndDate.getFullYear() <= 9999
      ? calculatedEndDate
      : null;
  const canSubmit = Boolean(startDate && endDate) && !isPending;
  const crossesYear =
    startDate && endDate && startDate.getFullYear() !== endDate.getFullYear();

  const year = new Date().getFullYear();

  function handleClose() {
    sessionRef.current += 1;
    setStartDate(null);
    setCount('1');
    closeModal();
  }

  function handleSubmit() {
    if (!startDate || !endDate || !isCountValid || isPending) return;

    const session = sessionRef.current;
    mutate(
      { startDate: toIsoDate(startDate), totalTermCount },
      {
        onSuccess: () => {
          toast.success(REPORT_MESSAGE.termCreateSuccess);
          if (session === sessionRef.current) handleClose();
        },
        onError: (error: Error) => {
          // 겹침·해 넘김 등 사유가 여러 개라 서버 메시지를 그대로 보여줌
          toast.error(
            error instanceof ApiError
              ? error.message
              : REPORT_MESSAGE.termCreateFail,
          );
        },
      },
    );
  }

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>회차 생성</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Flex dir="col" gap={2}>
          <Body2>시작일</Body2>
          <AdminCalendarField
            value={startDate}
            onChange={setStartDate}
            minDate={new Date(year, 0, 1)}
            maxDate={new Date(year, 11, 31)}
            placeholder="시작일을 선택해주세요."
            ariaLabel="회차 시작일 선택"
          />
        </Flex>
        <Flex dir="col" gap={2}>
          <Body2 as="label" htmlFor="totalTermCount">
            회차 수 (회차당 2주)
          </Body2>
          <Input
            id="totalTermCount"
            name="totalTermCount"
            type="number"
            min={1}
            placeholder="생성할 회차 수를 입력해주세요."
            value={count}
            onChange={(e) => setCount(e.target.value)}
            onClickReset={() => setCount('')}
          />
        </Flex>
        {startDate && endDate && (
          <Flex dir="col" gap={1}>
            <Body2>
              {totalTermCount}회차 · {toIsoDate(startDate)} ~{' '}
              {toIsoDate(endDate)}
            </Body2>
            {crossesYear && (
              <Caption1 className="text-red-200">
                회차 기간이 해를 넘겨 생성할 수 없어요.
              </Caption1>
            )}
          </Flex>
        )}
        {startDate && count && !endDate && (
          <Caption1 className="text-red-200">
            유효한 회차 수를 입력해주세요.
          </Caption1>
        )}
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={handleClose}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              <Body2 weight="bold">생성하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
