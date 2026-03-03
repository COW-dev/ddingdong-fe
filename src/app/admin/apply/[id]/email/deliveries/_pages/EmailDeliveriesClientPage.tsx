'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Body3, Flex, Title1 } from 'ddingdong-design-system';

import { emailQueryOptions } from '@/app/_api/queries/email';

import { EmailCard } from '../_components/EmailCard';

type EmailDeliveriesClientProps = {
  id: number;
};

export function EmailDeliveriesClientPage({ id }: EmailDeliveriesClientProps) {
  const { data: emailStatus } = useSuspenseQuery(
    emailQueryOptions.overview(id),
  );

  return (
    <>
      <Flex dir="col" className="gap-1 py-7 md:gap-2 md:py-10">
        <Title1 weight="bold">이메일 전송 현황</Title1>
        <Body3 className="text-gray-400">
          지원자 이메일 전송 완료/실패 건을 확인할 수 있어요.
        </Body3>
      </Flex>
      <Flex
        dir="row"
        justifyContent="between"
        alignItems="center"
        gap={2}
        className="mt-10 w-full flex-col md:flex-row"
      >
        {emailStatus.emailSendStatusOverviewInfoResponses.map(
          (statusItem, index) => (
            <EmailCard key={index} {...statusItem} formId={id} />
          ),
        )}
      </Flex>
    </>
  );
}
