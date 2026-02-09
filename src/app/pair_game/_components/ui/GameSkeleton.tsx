'use client';

import { Flex, Skeleton } from 'ddingdong-design-system';

export function GameSkeleton() {
  return (
    <div className="relative min-h-screen w-full px-4 pt-5 md:px-4 md:pt-5">
      <Flex
        dir="col"
        alignItems="center"
        className="mx-auto min-h-screen w-full max-w-md gap-6 md:gap-12"
      >
        <Flex dir="row" justifyContent="end" className="w-full md:hidden">
          <Skeleton className="h-5 w-12 rounded" />
        </Flex>

        <Skeleton className="h-24 w-full rounded-lg md:hidden" />

        <Skeleton className="h-64 w-full rounded-lg md:hidden" />

        <Flex dir="col" gap={2} className="w-full md:hidden">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </Flex>

        <div className="mt-auto w-full md:hidden">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        <Flex
          dir="col"
          alignItems="center"
          gap={1}
          className="hidden w-full md:flex"
        >
          <Skeleton className="h-8 w-64 rounded" />
          <Skeleton className="h-5 w-48 rounded" />
        </Flex>

        <Skeleton className="hidden h-[320px] w-full rounded-lg md:block" />

        <Flex
          dir="col"
          alignItems="center"
          gap={1}
          className="hidden w-full md:flex"
        >
          <Skeleton className="h-7 w-44 rounded" />
          <Skeleton className="h-7 w-56 rounded" />
        </Flex>

        <Flex
          dir="col"
          alignItems="center"
          gap={5}
          className="hidden w-full md:flex"
        >
          <Skeleton className="h-[250px] w-[250px] shrink-0 rounded-lg" />
          <Skeleton className="h-11 w-full max-w-[280px] rounded-lg" />
        </Flex>

        <div className="pointer-events-none relative mt-auto hidden w-screen md:block">
          <Flex dir="row" className="w-full gap-0 pt-20">
            <Skeleton className="h-28 min-w-0 flex-1 rounded-none object-bottom" />
            <Skeleton className="h-28 min-w-0 flex-1 rounded-none object-bottom" />
          </Flex>
        </div>
      </Flex>
    </div>
  );
}
