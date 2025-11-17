'use client';

import { Body2, Flex, Skeleton } from 'ddingdong-design-system';

export function ClubHeaderSkeleton() {
  return (
    <>
      <Flex dir="col" className="py-7">
        <Flex gap={3}>
          <Flex alignItems="center" className="h-auto object-contain">
            <Skeleton className="size-20 rounded-full" />
          </Flex>
          <Flex dir="col" gap={1} className="flex-1">
            <Skeleton className="h-8 w-48" />
            <Flex alignItems="center" gap={2}>
              <Skeleton className="h-5 w-16" />
              <Body2 className="px-1.5 text-gray-300">|</Body2>
              <Skeleton className="h-5 w-24" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="start" gap={4}>
        <Flex
          dir="col"
          justifyContent="center"
          className="w-full rounded-xl bg-gray-50 p-6 md:px-10 md:py-7 lg:w-[75%]"
        >
          <Flex className="flex w-full flex-col md:flex-row">
            <Flex className="mb-1.5 w-full max-w-[20rem]">
              <Body2 className="w-20 text-gray-500">회장</Body2>
              <Skeleton className="h-5 w-24" />
            </Flex>
            <Flex className="mb-1.5">
              <Body2 className="w-20 text-gray-500">연락처</Body2>
              <Skeleton className="h-5 w-32" />
            </Flex>
          </Flex>
          <Flex className="flex w-full flex-col md:flex-row">
            <Flex className="mb-1.5 w-full max-w-[20rem]">
              <Body2 className="w-20 text-gray-500">동아리방</Body2>
              <Skeleton className="h-5 w-32" />
            </Flex>
            <Flex className="mb-1.5 flex md:flex-row">
              <Body2 className="w-20 text-gray-500">모집기간</Body2>
              <Skeleton className="h-5 w-40" />
            </Flex>
          </Flex>
          <Flex className="w-full">
            <Body2 className="w-20 text-gray-500">정기모임</Body2>
            <Skeleton className="h-5 w-32" />
          </Flex>
        </Flex>
        <Skeleton className="fixed right-6 bottom-6 left-6 h-14 rounded-lg lg:static lg:right-auto lg:left-auto lg:w-[25%] lg:self-center" />
      </Flex>
    </>
  );
}
