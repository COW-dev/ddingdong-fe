import Head from 'next/head';
import type { GetServerSideProps } from 'next/types';
import BottomButton from '@/components/club/BottomButton';
import ClubHeading from '@/components/club/ClubHeading';
import { useClubInfo } from '@/hooks/useClubInfo';

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const { isError, isSuccess, data } = useClubInfo(clubId);

  if (isError) {
    <div>error</div>;
  }
  if (isSuccess) {
    const clubInfo = data.data;
    const { name, introduction, activity, ideal, formUrl } = clubInfo;

    return (
      <>
        <Head>
          <title>{`띵동 - ${name}`}</title>
        </Head>
        <ClubHeading info={clubInfo} />
        <main className="w-full lg:w-[70%]">
          <section className="mt-6 md:mt-8">
            <div className="text-lg font-bold md:text-xl">
              우리 동아리를 소개할게요
            </div>
            <div className="mt-1 text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
              {introduction.split('\n').map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
          <section className="mt-6 md:mt-8">
            <div className="text-lg font-bold md:text-xl">이런 활동을 해요</div>
            <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
              {activity.split('\n').map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="mt-6 md:mt-8">
            <div className="text-lg font-bold md:text-xl">
              이런 분과 함께하고 싶어요
            </div>
            <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
              {ideal.split('\n').map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </main>
        <BottomButton href={formUrl}>지원하기</BottomButton>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      clubId: id,
    },
  };
};
