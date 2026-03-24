import { ReactNode } from 'react';

export function ClubContainer({ children }: { children: ReactNode }) {
  return (
    <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {children}
    </ul>
  );
}
