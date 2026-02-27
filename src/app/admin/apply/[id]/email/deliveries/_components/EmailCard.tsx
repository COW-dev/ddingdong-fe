'use client';
import { useRouter } from 'next/navigation';

import {
  Body1,
  Body2,
  Body3,
  Card,
  Flex,
  Title2,
} from 'ddingdong-design-system';

import { EmailStatus } from '@/app/_api/types/email';
import { cn } from '@/utils/cn';

import { EMAIL_STATUS } from '../../../_constants/apply';
import { formatDate } from '../_utils/formatDate';

type EmailCardProps = EmailStatus & {
  formId: number;
};

export function EmailCard({
  formApplicationStatus,
  lastSentAt,
  successCount,
  failCount,
  formId,
}: EmailCardProps) {
  const router = useRouter();
  const hasSentHistory = lastSentAt != null && lastSentAt !== '';

  const statusPath = formApplicationStatus.toLowerCase();

  const handleClick = () => {
    if (hasSentHistory) {
      router.push(`/apply/${formId}/email/deliveries/${statusPath}`);
    }
  };

  return (
    <Card
      className={cn('w-full md:h-[310px]', hasSentHistory && 'cursor-pointer')}
      onClick={handleClick}
    >
      <Flex
        dir="col"
        justifyContent="between"
        alignItems="stretch"
        gap={2}
        className="h-full"
      >
        <Flex dir="col" gap={1}>
          <Title2 weight="bold">
            {EMAIL_STATUS[formApplicationStatus as keyof typeof EMAIL_STATUS]}
          </Title2>
          <Body3 className="text-gray-400">
            {hasSentHistory ? formatDate(lastSentAt) : '전송 내역이 없습니다.'}
          </Body3>
        </Flex>
        <Flex
          dir="row"
          justifyContent="end"
          gap={2}
          className="w-full md:items-center md:justify-between"
        >
          <Body2 as="span">
            완료{' '}
            <Body1 as="span" weight="bold">
              {successCount}
            </Body1>
            건
          </Body2>
          <Body2 as="span">
            실패{' '}
            <Body1 as="span" weight="bold" className="text-red-600">
              {failCount}
            </Body1>
            건
          </Body2>
        </Flex>
      </Flex>
    </Card>
  );
}
