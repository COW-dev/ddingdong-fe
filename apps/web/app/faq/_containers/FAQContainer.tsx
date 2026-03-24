import { ReactNode } from 'react';

import { Flex } from '@dds/shared';

export function FAQContainer({ children }: { children: ReactNode }) {
  return (
    <Flex
      dir="col"
      justifyContent="between"
      alignItems="center"
      className="w-full"
    >
      {children}
    </Flex>
  );
}
