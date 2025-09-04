import { PropsWithChildren } from 'react';

export default function DocumentContainer({ children }: PropsWithChildren) {
  return <ul className="mt-4 w-full">{children}</ul>;
}
