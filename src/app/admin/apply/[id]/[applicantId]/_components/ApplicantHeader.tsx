import { Badge, Body2, Flex, Title1 } from 'ddingdong-design-system';

import { STATUS_TYPE } from '@/app/admin/apply/[id]/_constants/apply';

type ApplicantHeaderProps = {
  name: string;
  status: string;
  submittedAt: string;
};

export function ApplicantHeader({
  name,
  status,
  submittedAt,
}: ApplicantHeaderProps) {
  const formattedDate = submittedAt.replaceAll('-', '.').split('T')[0];
  const formattedTime = submittedAt.split('T')[1].replaceAll('-', '.');

  return (
    <Flex
      dir="row"
      alignItems="center"
      justifyContent="between"
      className="border-b border-gray-200 pt-7 pb-5 md:pt-10"
    >
      <Flex dir="row" alignItems="center" gap={2}>
        <Title1 weight="bold" className="ml-3">
          {name}
        </Title1>
        <Badge
          variant={
            STATUS_TYPE[status as keyof typeof STATUS_TYPE].backgroundColor as
              | 'positive'
              | 'negative'
              | 'neutral'
          }
          text={STATUS_TYPE[status].statusText || ''}
        />
      </Flex>
      <Body2 weight="medium" className="text-end">
        제출일시 {formattedDate} {formattedTime}
      </Body2>
    </Flex>
  );
}
