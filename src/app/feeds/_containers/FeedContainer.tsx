import { PropsWithChildren } from 'react';

export function FeedContainer({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-3 gap-0.5">{children}</div>;
}
