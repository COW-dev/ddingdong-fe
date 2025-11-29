import { PropsWithChildren } from 'react';

import { Body1, Body2, Flex } from 'ddingdong-design-system';

import { parseDate } from '@/utils/parse';

type Props = {
  club: string;
  createdAt: string;
  location: string;
};

export function FixPostInfo({ club, createdAt, location }: Props) {
  return (
    <FixItemInfoContainer>
      <Flex dir="col" alignItems="center" justifyContent="center">
        <Body1 className="text-blue-500">동아리</Body1>
        <Body2>{club}</Body2>
      </Flex>
      <Flex dir="col" alignItems="center" justifyContent="center">
        <Body1 className="text-blue-500">신청일</Body1>
        <Body2>{parseDate(createdAt)}</Body2>
      </Flex>
      <Flex dir="col" alignItems="center" justifyContent="center">
        <Body1 className="text-blue-500">동아리방</Body1>
        <Body2>{location}</Body2>
      </Flex>
    </FixItemInfoContainer>
  );
}

function FixItemInfoContainer({ children }: PropsWithChildren) {
  return <Flex justifyContent="between">{children}</Flex>;
}
