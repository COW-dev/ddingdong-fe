'use client';

import { useRouter } from 'next/navigation';

import { Title3, IconButton, Flex } from 'ddingdong-design-system';

import ReportItem from '@/components/report/ReportItem';

export function ReportDetailClientPage({
  term,
  name,
}: {
  term: number;
  name: string;
}) {
  const router = useRouter();

  return (
    <>
      <Flex
        alignItems="center"
        className="mt-7 text-xl font-bold md:mt-10 md:text-2xl"
      >
        <IconButton
          iconName="navbarArrow"
          color="gray"
          size={24}
          onClick={(e) => {
            e.stopPropagation();
            router.back();
          }}
        />
        <Title3>
          {term}회차 / {name}
        </Title3>
      </Flex>
      <ReportItem term={Number(term)} name={name} />
    </>
  );
}
