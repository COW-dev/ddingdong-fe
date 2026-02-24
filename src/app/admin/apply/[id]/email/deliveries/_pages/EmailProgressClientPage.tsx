'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body3,
  Button,
  DoubleButton,
  Flex,
  Icon,
  Title3,
} from 'ddingdong-design-system';

import { emailQueryOptions } from '@/app/_api/queries/email';
import { cn } from '@/lib/utils';
import { getProgressData } from '../_utils/getProgressData';

type EmailProgressProps = {
  applyId: number;
  historyId: number;
};

export function EmailProgressClientPage({
  applyId,
  historyId,
}: EmailProgressProps) {
  const router = useRouter();
  const [startTime] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const { data: emailCounts } = useSuspenseQuery({
    ...emailQueryOptions.counts(historyId),
    refetchInterval: () => (elapsedSeconds < 30 ? 2000 : false),
  });

  const isCompleted =
    emailCounts.successCount + emailCounts.failCount === emailCounts.totalCount;
  const progressCountText = emailCounts.successCount + emailCounts.failCount;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const isDelayedThreshold = !isCompleted && elapsedSeconds >= 30;

  const progressData = getProgressData(
    isCompleted,
    isDelayedThreshold,
    emailCounts,
  );

  return (
    <Flex
      dir="col"
      justifyContent="center"
      alignItems="center"
      gap={2}
      className="w-full py-7 md:py-10"
    >
      <Icon
        name={progressData.icon}
        color="primary"
        size={55}
        className={cn(progressData.icon === 'loading' && 'animate-spin')}
      />
      <Flex
        dir="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        className="mt-4"
      >
        <Title3 weight="bold" className="text-center">
          {progressData.message} (
          <Title3
            as="span"
            className={cn(
              emailCounts.failCount > 0 ? 'text-red-600' : 'text-blue-600',
            )}
          >
            {progressCountText}
          </Title3>
          /{emailCounts.totalCount}명)
        </Title3>
      </Flex>
      <Body3 className="text-center text-gray-400">
        {progressData.subMessage}
      </Body3>
      <DoubleButton
        left={
          <Button
            variant="secondary"
            color="blue"
            size="full"
            onClick={() => router.push(`/apply/${applyId}`)}
          >
            홈으로 이동
          </Button>
        }
        right={
          <Button
            variant="primary"
            color="blue"
            size="full"
            onClick={() => router.push(`/apply/${applyId}/email/deliveries`)}
          >
            이메일 전송 현황
          </Button>
        }
        className="mt-10 w-full md:w-[400px]"
      />
    </Flex>
  );
}
