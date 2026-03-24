import { PropsWithChildren } from 'react';

import { Card, Flex } from '@dds/shared';

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
