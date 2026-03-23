import { PropsWithChildren } from 'react';

export function TabContainer({ children }: PropsWithChildren) {
  return <section className="mt-5 w-full lg:w-[75%]">{children}</section>;
}
