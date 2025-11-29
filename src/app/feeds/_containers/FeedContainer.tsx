import { PropsWithChildren } from 'react';

export function FeedContainer({ children }: PropsWithChildren) {
  return <div className="mt-4 grid grid-cols-3 gap-0.5">{children}</div>;
}
