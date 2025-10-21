'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  Title1,
  Title3,
  IconButton,
  Flex,
  Badge,
  Card,
  Caption1,
} from 'ddingdong-design-system';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { Club } from '@/app/_api/types/club';
import FilterOption from '../_components/FilterOption';
import { deptCaptionColor } from '@/constants/color';
import { ReportCardContainer } from '../../../_containers/ReportCardContainer';

export function ReportTermClientPage({ term }: { term: number }) {
  const router = useRouter();

  const [{ data: allClub }, { data: termReports }] = useSuspenseQueries({
    queries: [clubQueryOptions.all(), reportQueryOptions.termReports(term)],
  });

  const submitClubNameSet = useMemo(
    () => new Set(termReports.map(({ club }) => club.name)),
    [termReports],
  );
  const sortedClubs = useMemo(
    () => [...allClub].sort((a, b) => a.category.localeCompare(b.category)),
    [allClub],
  );

  const optionValue = useMemo(() => {
    const submit: Club[] = [];
    const unSubmit: Club[] = [];

    for (const club of sortedClubs) {
      (submitClubNameSet.has(club.name) ? submit : unSubmit).push(club);
    }

    return { all: sortedClubs, submit, unSubmit };
  }, [sortedClubs, submitClubNameSet]);

  const [filteredClub, setFilteredClub] = useState<Club[]>(optionValue.all);

  const handleClickBackButton = () => router.back();

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        활동보고서 관리
      </Title1>
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
            handleClickBackButton();
          }}
        />
        <Title3>{term}회차</Title3>
      </Flex>
      <FilterOption
        filterOption={optionValue}
        setFilteredClub={setFilteredClub}
      />
      <ReportCardContainer>
        {filteredClub.map((club) => (
          <ReportClubCard
            key={club.id}
            term={term}
            club={club}
            isSubmitted={submitClubNameSet.has(club.name)}
          />
        ))}
      </ReportCardContainer>
    </>
  );
}

function ReportClubCard({
  term,
  club,
  isSubmitted,
}: {
  term: number;
  club: Club;
  isSubmitted: boolean;
}) {
  const { id, name, category, tag } = club;
  return (
    <Link href={`/report/admin/${term}/${name}`}>
      <Card key={id} className="flex items-center justify-between">
        <div>
          <Title3>{name}</Title3>
          <Flex alignItems="center" className="gap-1 text-gray-500">
            <Caption1 className={`${deptCaptionColor[category]}`}>
              {category}
            </Caption1>
            <span className="text-gray-300"> | </span>
            <Caption1>{tag}</Caption1>
          </Flex>
        </div>
        <Badge
          variant={isSubmitted ? 'positive' : 'negative'}
          text={isSubmitted ? '제출완료' : '미제출'}
        />
      </Card>
    </Link>
  );
}
