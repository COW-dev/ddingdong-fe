import Head from 'next/head';
import Image from 'next/image';
import type { GetServerSideProps } from 'next/types';
import BottomButton from '@/components/club/BottomButton';
import ClubHeading from '@/components/club/ClubHeading';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { useClubInfo } from '@/hooks/api/club/useClubInfo';
import { parseImgUrl } from '@/utils/parse';

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const { isError, isSuccess, data } = useClubInfo(clubId);
  function checkUrl(strUrl: string) {
    const expUrl = /https?:\/\/[^\s"]/;
    return expUrl.test(strUrl);
  }

  function parseUrl(line: string) {
    if (checkUrl(line)) {
      const words = line.split(' ');
      const elements = words.map((word, index) => {
        return checkUrl(word) ? (
          <a
            key={`urlWord${index}`}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate whitespace-pre-line pr-1 underline underline-offset-1"
          >
            {word}
          </a>
        ) : (
          <span key={`urlWord${index}`} className="pr-1">
            {word}
          </span>
        );
      });
      return <div className="flex">{elements}</div>;
    } else {
      return <p>{line}</p>;
    }
  }
  if (isError) {
    <div>error</div>;
  }
  const { data: allClubs } = useAllClubs();

  if (isSuccess) {
    const clubInfo = data.data;
    const { name, introduction, activity, ideal, formUrl, introduceImageUrls } =
      clubInfo;

    const isRecruit =
      allClubs?.data.find((club) => club.name === name)?.recruitStatus ===
        '모집 중' && formUrl;

    const parsedImg = introduceImageUrls && parseImgUrl(introduceImageUrls[0]);
    return (
      <>
        <Head>
          <title>{`띵동 - ${name}`}</title>
        </Head>
        <ClubHeading info={clubInfo} />
        <main className="w-full lg:w-[70%]">
          <section className="mt-6 md:mt-8">
            <div
              className={`${
                introduceImageUrls.length === 0 && `hidden`
              } mt-6 md:mt-8`}
            >
              <div className="my-2 text-lg font-bold md:text-xl">
                동아리 소개 이미지
              </div>
              <Image
                src={parsedImg}
                width={1000}
                height={500}
                priority
                alt="동아리 소개 사진"
                className={`${
                  introduceImageUrls.length === 0 && `hidden`
                } max-h-[50vh] rounded-2xl object-scale-down`}
              />
            </div>

            <div className="mt-6 text-lg font-bold md:mt-8 md:text-xl">
              우리 동아리를 소개할게요
            </div>
            <div className="mt-1 bg-white text-base font-medium text-gray-500 md:mt-2 md:text-lg">
              {introduction?.split('\n').map((line) => (
                <p key={line}>{parseUrl(line)}</p>
              ))}
            </div>
          </section>
          <section className="mt-6 md:mt-8">
            <div className="text-lg font-bold md:text-xl">이런 활동을 해요</div>
            <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
              {activity?.split('\n').map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
          <section className="mt-6 md:mt-8">
            <div className="text-lg font-bold md:text-xl">
              이런 분과 함께하고 싶어요
            </div>
            <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
              {ideal?.split('\n').map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </main>
        <div className={`${!isRecruit && 'hidden'}`}>
          <BottomButton href={clubInfo.formUrl}>지원하기</BottomButton>
        </div>
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
