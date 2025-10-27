'use client';
import Image from 'next/image';
import UnSubmitImage from '@/assets/unsubmit_announce.png';

import { ReportResponse } from '@/app/_api/types/report';
import { Body3, Flex, Icon } from 'ddingdong-design-system';
import {
  ReportContiner,
  ReportHeaderContainer,
  ReportContentContainer,
} from '../_containers/ReportContainer';
import { StudentInfo } from '@/types/report';

type Props = {
  reportData: ReportResponse;
};

export default function Report({ reportData }: Props) {
  const {
    place,
    startDate,
    endDate,
    content,
    image: responseImage,
    participants,
  } = reportData;

  const image = responseImage?.originUrl ?? UnSubmitImage;
  const hasParticipants = participants?.some((p) => p.name?.trim());

  return (
    <ReportContiner>
      <Flex dir="col" className="w-full gap-4 py-2">
        <ReportHeaderContainer>
          <Place place={place} />
          <Date start={startDate} end={endDate} />
        </ReportHeaderContainer>
        <ReportContentContainer title="활동 참여 인원">
          {hasParticipants ? (
            <ParticipantsList participants={participants} />
          ) : (
            <EmptyText />
          )}
        </ReportContentContainer>
        <ReportContentContainer title="활동 내용">
          {content?.trim() ? <Body3>{content}</Body3> : <EmptyText />}
        </ReportContentContainer>
      </Flex>
      <Image
        src={image}
        className="h-80 w-80 rounded-2xl object-cover"
        alt="reportImage"
        priority
        width={320}
        height={300}
      />
    </ReportContiner>
  );
}

function EmptyText({ text }: { text?: string }) {
  return (
    <Body3 className="text-gray-300">{text ?? '작성된 내용이 없습니다.'}</Body3>
  );
}

function ParticipantsList({ participants }: { participants?: StudentInfo[] }) {
  return (
    <ul className="space-y-1">
      {participants?.map(
        ({ name, studentId, department }, index) =>
          name?.trim() && (
            <Body3 key={index}>
              {name} | {studentId} | {department}
            </Body3>
          ),
      )}
    </ul>
  );
}

function Place({ place }: { place: string }) {
  return (
    <Flex
      alignItems="center"
      className="w-fit gap-2 rounded-xl border-[1.5px] border-gray-100 bg-gray-100 p-1.5 px-2.5"
    >
      <Icon name="pin" size={20} />
      {place?.trim() ? <Body3>{place}</Body3> : <EmptyText text="장소 없음" />}
    </Flex>
  );
}

function Date({ start, end }: { start?: string; end?: string }) {
  if (!start) {
    return <EmptyText text="일시 없음" />;
  }
  const endTime = end?.split(' ')[1];
  return (
    <Body3>
      일시 {start}~{endTime}
    </Body3>
  );
}
