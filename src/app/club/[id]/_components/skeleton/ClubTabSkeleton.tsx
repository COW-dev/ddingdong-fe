'use client';

import { Body1, Flex, Skeleton } from 'ddingdong-design-system';

export function ClubTabSkeleton() {
  return (
    <div className="w-full">
      <section className="mt-6 md:mt-8">
        <Skeleton className="mb-2 h-6 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </section>

      <section className="mt-6 md:mt-8">
        <Body1 as="span" weight="bold">
          <Skeleton className="inline-block h-6 w-40" />
        </Body1>
        <Flex dir="col" className="mt-1 space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </Flex>
      </section>

      <section className="mt-6 md:mt-8">
        <Body1 as="span" weight="bold">
          <Skeleton className="inline-block h-6 w-32" />
        </Body1>
        <ul className="mt-1 ml-5 list-disc space-y-2 md:mt-1.5">
          <li>
            <Skeleton className="h-5 w-full" />
          </li>
          <li>
            <Skeleton className="h-5 w-4/5" />
          </li>
          <li>
            <Skeleton className="h-5 w-full" />
          </li>
        </ul>
      </section>

      <section className="mt-6 md:mt-8">
        <Body1 as="span" weight="bold">
          <Skeleton className="inline-block h-6 w-40" />
        </Body1>
        <ul className="mt-1 ml-5 list-disc space-y-2 md:mt-1.5">
          <li>
            <Skeleton className="h-5 w-full" />
          </li>
          <li>
            <Skeleton className="h-5 w-3/4" />
          </li>
          <li>
            <Skeleton className="h-5 w-full" />
          </li>
        </ul>
      </section>
    </div>
  );
}
