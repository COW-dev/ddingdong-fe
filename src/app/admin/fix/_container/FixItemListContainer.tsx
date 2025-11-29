import { PropsWithChildren } from 'react';

import { Card, Flex } from 'ddingdong-design-system';

export function FixItemListContainer({ children }: PropsWithChildren) {
  return (
    <Flex dir="col" gap={2} as="ul">
      {children}
    </Flex>
  );
}

export function FixItemContainer({ children }: PropsWithChildren) {
  return (
    <Card as="li" className="flex items-center">
      {children}
    </Card>
  );
}
