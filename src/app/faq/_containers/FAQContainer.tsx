import { ReactNode } from 'react';

import { Flex } from 'ddingdong-design-system';

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
