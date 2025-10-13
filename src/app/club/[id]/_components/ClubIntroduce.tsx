import { Body1, Body2, Flex } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';
import { OptimizedImage } from '@/components/common/OptimizedImage';

type ClubIntroduceProps = Pick<
  ClubDetail,
  'introductionImage' | 'introduction' | 'activity' | 'ideal'
>;

export const ClubIntroduce = ({
  introductionImage,
  introduction,
  activity,
  ideal,
}: ClubIntroduceProps) => {
  return (
    <main className="w-full">
      {introductionImage?.originUrl && (
        <section className="mt-6 md:mt-8">
          <Body1 weight="bold" className="my-2">
            동아리 소개 이미지
          </Body1>
          <Flex justifyContent="center" className="rounded-2xl">
            <OptimizedImage
              priority
              src={introductionImage.originUrl}
              width={1000}
              height={500}
              alt="동아리 소개 사진"
              className="max-h-[50vh] rounded-2xl object-scale-down"
            />
          </Flex>
        </section>
      )}

      <section className="mt-6 md:mt-8">
        <Body1 weight="bold">우리 동아리를 소개할게요</Body1>
        <Flex dir="col" className="mt-1 space-y-1 text-gray-500">
          {renderList(introduction, 'p')}
        </Flex>
      </section>

      <section className="mt-6 md:mt-8">
        <Body1 weight="bold">이런 활동을 해요</Body1>
        <ul className="mt-1 ml-5 list-disc text-gray-500 md:mt-1.5">
          {renderList(activity, 'li')}
        </ul>
      </section>

      <section className="mt-6 md:mt-8">
        <Body1 weight="bold">이런 분과 함께하고 싶어요</Body1>
        <ul className="mt-1 ml-5 list-disc text-gray-500 md:mt-1.5">
          {renderList(ideal, 'li')}
        </ul>
      </section>
    </main>
  );
};

function renderLineWithLinks(line: string) {
  const urlRegex = /(https?:\/\/[^\s"]+)/g;
  const parts = line.split(urlRegex);

  return (
    <>
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="pr-1 underline underline-offset-1"
          >
            <Body2 weight="medium" className="text-blue-600">
              {part}
            </Body2>
          </a>
        ) : (
          <Body2 as="span" key={i} weight="medium" className="pr-1">
            {part}
          </Body2>
        ),
      )}
    </>
  );
}

function renderList(text?: string, as: 'li' | 'p' = 'p') {
  if (!text) return null;
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, i) =>
      as === 'li' ? (
        <li key={i}>
          <Body2 as="span" weight="medium">
            {line}
          </Body2>
        </li>
      ) : (
        <p key={i}>{renderLineWithLinks(line)}</p>
      ),
    );
}
