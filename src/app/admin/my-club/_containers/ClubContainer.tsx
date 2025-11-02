import { PropsWithChildren } from 'react';

import { Flex } from 'ddingdong-design-system';

export function ClubContainer({ children }: PropsWithChildren) {
  return <Flex dir="col">{children}</Flex>;
}

export function ClubHeadingContainer({ children }: PropsWithChildren) {
  return (
    <Flex alignItems="center" justifyContent="between">
      {children}
    </Flex>
  );
}

export function ClubIntroductionContainer({ children }: PropsWithChildren) {
  return (
    <Flex dir="col" gap={6} className="pt-10">
      {children}
    </Flex>
  );
}
