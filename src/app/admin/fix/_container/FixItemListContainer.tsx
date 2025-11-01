import { PropsWithChildren } from 'react';

import { Card } from 'ddingdong-design-system';

export function FixItemListContainer({ children }: PropsWithChildren) {
  return <ul className="mt-10 md:mt-14">{children}</ul>;
}

export function FixItemContainer({ children }: PropsWithChildren) {
  return (
    <Card as="li" className="flex items-center">
      {children}
    </Card>
  );
}
