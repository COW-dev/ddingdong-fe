'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Body3, Flex, Title1 } from 'ddingdong-design-system';

import { emailQueryOptions } from '@/app/_api/queries/email';

import { EmailStatusTabs } from '../_components/EmailStatusTabs';
import { SendStatusButton } from '../_components/SendStatusButton';
import { StatusNavigator } from '../_components/StatusNavigator';
import { groupByEmailSendStatus } from '../_utils/groupByEmailSendStatus';

type EmailStatusDetailClientProps = {
  id: number;
  status: string;
};

export function EmailStatusDetailClientPage({
  id,
  status,
}: EmailStatusDetailClientProps) {
  const { data: emailDeliveryStatus } = useSuspenseQuery(
    emailQueryOptions.status(id, status),
  );

  const {
    IN_PROGRESS: sendingList,
    SUCCESS: successList,
    TEMPORARY_FAILURE: failList,
    PERMANENT_FAILURE: permanentFailList,
  } = groupByEmailSendStatus(emailDeliveryStatus.emailSendStatusInfoResponses);

  const failListAndPermanentFailList = [...failList, ...permanentFailList];
  return (
    <>
      <Flex
        dir="row"
        justifyContent="between"
        alignItems="start"
        className="w-full py-7 md:gap-2 md:py-10"
      >
        <Flex dir="col" className="gap-1 md:gap-2">
          <Title1 weight="bold">이메일 전송 현황</Title1>
          <Body3 className="text-gray-400">
            지원자 이메일 전송 완료/실패 건을 확인할 수 있어요.
          </Body3>
        </Flex>
        <SendStatusButton sendingList={sendingList} />
      </Flex>
      <StatusNavigator status={status} />
      <EmailStatusTabs
        success={successList}
        fail={failListAndPermanentFailList}
      />
    </>
  );
}
