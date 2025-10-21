import Image from 'next/image';
import UnSubmitImage from '@/assets/unsubmit_announce.png';

import { ReportResponse } from '@/app/_api/types/report';
import { Body2, Body3, Flex, Icon } from 'ddingdong-design-system';

type Props = {
  reportData: ReportResponse;
  term: number;
};

export default function Report({ reportData, term }: Props) {
  const {
    place,
    startDate,
    endDate,
    content,
    image: responseImage,
    participants,
  } = reportData;

  const image = responseImage?.originUrl
    ? responseImage.originUrl
    : UnSubmitImage;

  const hasParticipants = participants?.some((p) => p.name?.trim());

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className="flex-col-reverse md:flex-row"
    >
      <Flex dir="col" className="gap-4 py-2">
        <Flex justifyContent="between" alignItems="center" className="flex-1">
          <Flex
            alignItems="center"
            className="h-8 gap-2 rounded-xl border-[1.5px] border-gray-100 px-2 whitespace-nowrap"
          >
            <Icon name="pin" size={20} />
            <Body3 className="text-gray-400">
              {place === '' ? '장소없음' : place}
            </Body3>
          </Flex>
          <Body3>
            {startDate ? (
              <>
                일자 {startDate}
                {startDate.split(' ')[1]}~{endDate.split(' ')[1]}
              </>
            ) : (
              <span className="text-gray-300">일자없음</span>
            )}
          </Body3>
        </Flex>
        <Section title="활동 참여 인원">
          {hasParticipants ? (
            <ul className="space-y-1">
              {participants?.map(({ name, studentId, department }, idx) =>
                name?.trim() ? (
                  <Body3 key={idx} className="text-gray-400">
                    {name} | {studentId} | {department}
                  </Body3>
                ) : null,
              )}
            </ul>
          ) : (
            <Body3 className="text-gray-400">작성된 내용이 없습니다.</Body3>
          )}
        </Section>
        <Section title="활동 내용">
          <Body3 className="text-gray-400">
            {!content?.trim() ? '작성된 내용이 없습니다.' : content}
          </Body3>
        </Section>
      </Flex>
      <Image
        src={image}
        className={`object-cover`}
        alt="reportImage"
        priority
        width={300}
        height={300}
      />
    </Flex>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Flex dir="col" className="gap-2">
      <Body2 weight="semibold" className="text-blue-500">
        {title}
      </Body2>
      {children}
    </Flex>
  );
}
