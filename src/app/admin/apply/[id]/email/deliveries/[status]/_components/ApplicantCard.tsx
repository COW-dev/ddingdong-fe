import { Badge, Body2, Caption1, Card, Flex } from 'ddingdong-design-system';

import { EmailDeliveryStatus } from '@/app/_api/types/email';

import { formatDate } from '../../_utils/formatDate';

export function ApplicantCard({
  name,
  studentNumber,
  sendAt,
  emailSendStatus,
}: Omit<EmailDeliveryStatus, 'formApplicationStatus'>) {
  const isPermanentFailure = emailSendStatus === 'PERMANENT_FAILURE';

  return (
    <Card>
      <Flex dir="col">
        <Flex dir="row" justifyContent="between" alignItems="center" gap={1}>
          <Flex gap={1} alignItems="center">
            <Body2>{name}</Body2>
            <Caption1 className="text-gray-400">{studentNumber}</Caption1>
          </Flex>
          {isPermanentFailure && <Badge variant="negative" text="영구 실패" />}
        </Flex>
        <Caption1 className="text-gray-300">
          {sendAt && formatDate(sendAt)}
        </Caption1>
      </Flex>
    </Card>
  );
}
