import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import ArrowImage from '@/assets/leftArrow.svg';
import FilterOption from '@/components/report/FilterOption';
import { deptCaptionColor } from '@/constants/color';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { useTermReports } from '@/hooks/api/club/useTermReports';
import { Club } from '@/types';

type ReportPageProps = {
  term: number;
};

function Index({ term }: ReportPageProps) {
  const router = useRouter();
  const [{ token }] = useCookies(['token']);
  const { data: allClub } = useAllClubs();
  const { data: termReports } = useTermReports(term, token);

  const [filteredClub, setFilteredClub] = useState<Club[] | undefined>(
    allClub?.data,
  );

  const submitClubNames = termReports?.data.map(({ club }) => club.name);
  const submitClubs = allClub?.data?.filter((club) =>
    submitClubNames?.includes(club.name),
  );
  const unSubmitClubs = allClub?.data?.filter(
    (club) => !submitClubNames?.includes(club.name),
  );

  const optionValue = {
    all: allClub?.data,
    submit: submitClubs,
    unSubmit: unSubmitClubs,
  };

  const isSubmitClub = (club: Club) => {
    return submitClubs?.includes(club);
  };

  const handleClickBackButton = () => {
    router.back();
  };

  useEffect(() => {
    const sortedClub = allClub?.data.sort((a, b) =>
      a.category.localeCompare(b.category),
    );
    if (sortedClub) setFilteredClub(sortedClub);
  }, [allClub]);

  return (
    <>
      <Head>
        <title>활동보고서 관리</title>
      </Head>
      <h1 className="mt-7 flex text-2xl font-bold md:mt-10 md:text-4xl">
        활동보고서 관리
      </h1>
      <div
        className="mt-7 flex items-center text-xl font-bold md:mt-10 md:text-2xl"
        onClick={handleClickBackButton}
      >
        <Image src={ArrowImage} alt="뒤로가기 화살표" width={28} height={28} />
        {term}회차
      </div>
      <FilterOption
        filterOption={optionValue}
        setFilteredClub={setFilteredClub}
      />
      <div className="mt-6  w-full gap-4 sm:grid-cols-2 md:mt-8 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {filteredClub?.map((item) => {
            const { id, name, category, tag } = item;
            return (
              <div
                key={id}
                className={`rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50`}
              >
                <Link
                  href={`/report/admin/${term}/${name}`}
                  data-item={item}
                  className="flex"
                >
                  <div className="h-full w-full items-center justify-between p-5 md:p-6">
                    <div className="text-lg font-bold md:text-xl">{name}</div>
                    <div className="flex items-center">
                      <div
                        className={`rounded-lg text-sm font-semibold ${deptCaptionColor[category]}`}
                      >
                        {category}
                      </div>
                      <div className="px-1 text-sm font-medium text-gray-300">
                        |
                      </div>
                      <div className="rounded-lg text-sm font-semibold text-gray-500">
                        {tag}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-5">
                    <div
                      className={`flex items-center rounded-lg px-2 py-1 text-sm font-semibold ${
                        isSubmitClub(item)
                          ? 'bg-green-50 text-green-400'
                          : 'bg-red-50 text-red-400'
                      }
                    `}
                    >
                      {isSubmitClub(item) ? '제출완료' : '미제출'}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term } = context.query;
  return {
    props: {
      term: term,
    },
  };
};
