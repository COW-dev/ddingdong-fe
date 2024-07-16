import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import ArrowImage from '@/assets/leftArrow.svg';
import { cn } from '@/components/ui/utils';
import { deptCaptionColor } from '@/constants/color';
import { useAdminAllReports } from '@/hooks/api/club/useAdminAllReports';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
type ReportPageProps = {
  term: number;
};

function Index({ term }: ReportPageProps) {
  const [{ token }] = useCookies(['token']);
  const { data: allClub } = useAllClubs();

  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  const clubList = allClub?.data.sort((a, b) =>
    a.category.localeCompare(b.category),
  );

  const { data: allReports } = useAdminAllReports(token);

  const submitClubNames = allReports?.data
    .filter((item) => item.term === String(term))
    .map((item) => item.name);
  // const unSubmitClubNames = clubList?.filter(
  //   (club) => !submitClubNames?.includes(club),
  // );

  const isSubmitClub = (clubName: string) => {
    return submitClubNames?.includes(clubName);
  };

  return (
    <>
      <Head>
        <title>활동보고서 관리</title>
      </Head>
      <h1
        onClick={handleClickBackButton}
        className="mt-7 flex text-2xl font-bold md:mt-10 md:text-4xl"
      >
        <Image src={ArrowImage} alt="뒤로가기 화살표" width={40} height={40} />
        {term}회차
      </h1>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {clubList?.map((item) => {
            return (
              <div
                key={item.id}
                className={`rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50`}
              >
                <Link
                  href={`/report/admin/${item}`}
                  data-item={item}
                  className="flex"
                >
                  <div className="h-full w-full items-center justify-between p-5 md:p-6">
                    <div className="text-lg font-bold md:text-xl">
                      {item.name}
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`rounded-lg text-sm font-semibold ${
                          deptCaptionColor[item.category]
                        }`}
                      >
                        {item.category}
                      </div>
                      <div className="px-1 text-sm font-medium text-gray-300">
                        |
                      </div>
                      <div className="rounded-lg text-sm font-semibold text-gray-500">
                        {item.tag}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-5">
                    <div
                      className={cn(
                        'flex items-center rounded-lg px-2 py-1 text-sm font-semibold ',
                        isSubmitClub(item.name)
                          ? 'bg-green-50 text-green-400'
                          : 'bg-red-50 text-red-400',
                      )}
                    >
                      {isSubmitClub(item.name) ? '제출완료' : '미제출'}
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
