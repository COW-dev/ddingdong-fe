import Image from 'next/image';
import { UrlType } from '@/types';

export type ClubInfoDetail = {
  introductionImageUrl: UrlType;
  introduction: string;
  activity: string;
  ideal: string;
};

export default function ClubInfo({
  introductionImageUrl,
  introduction,
  activity,
  ideal,
}: ClubInfoDetail) {
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
    }
    return <span>{line}</span>;
  }

  return (
    <main className="w-full lg:w-[70%]">
      <section className="mt-6 md:mt-8">
        <div
          className={`${
            !introductionImageUrl?.originUrl && `hidden`
          } mt-6 md:mt-8`}
        >
          <div className="my-2 text-lg font-bold md:text-xl">
            동아리 소개 이미지
          </div>
          {introductionImageUrl?.originUrl && (
            <Image
              src={introductionImageUrl?.originUrl}
              width={1000}
              height={500}
              priority
              alt="동아리 소개 사진"
              className={`${
                !introductionImageUrl && `hidden`
              } max-h-[50vh] rounded-2xl object-scale-down`}
            />
          )}
        </div>

        <div className="mt-6 text-lg font-bold md:mt-8 md:text-xl">
          우리 동아리를 소개할게요
        </div>
        <div className="mt-1 bg-white text-base font-medium text-gray-500 md:mt-2 md:text-lg">
          {introduction?.split('\n').map((line: string, index: number) => (
            <p key={index}>{parseUrl(line)}</p>
          ))}
        </div>
      </section>
      <section className="mt-6 md:mt-8">
        <div className="text-lg font-bold md:text-xl">이런 활동을 해요</div>
        <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
          {activity?.split('\n').map((line: string, index: number) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="mt-6 md:mt-8">
        <div className="text-lg font-bold md:text-xl">
          이런 분과 함께하고 싶어요
        </div>
        <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
          {ideal?.split('\n').map((line: string, index: number) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
