'use client';

import { Body3, Flex, Icon } from 'ddingdong-design-system';

import { ReportAPIResponse, ReportMember } from '@/app/_api/types/report';
import UnSubmitImage from '@/assets/unsubmit_announce.png';

import {
  ReportContiner,
  ReportHeaderContainer,
  ReportContentContainer,
} from '../_containers/ReportContainer';

type Props = {
  report: ReportAPIResponse;
};

export default function Report({ report }: Props) {
  const {
    place,
    startDate,
    endDate,
    content,
    image: responseImage,
    participants,
  } = report;

  const image = responseImage?.originUrl ?? UnSubmitImage.src;
  const hasParticipants = participants?.some((p) => p.name?.trim());

  return (
    <ReportContiner>
      <Flex dir="col" className="w-full gap-6 py-2">
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
      <Flex className="overflow-hidden">
        <img
          src={image}
          className="object-contain"
          alt="activeReport"
          width={400}
          height={400}
        />
      </Flex>
    </ReportContiner>
  );
}

function EmptyText({ text }: { text?: string }) {
  return (
    <Body3 className="text-gray-300">{text ?? '작성된 내용이 없습니다.'}</Body3>
  );
}

function ParticipantsList({ participants }: { participants?: ReportMember[] }) {
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
      className="w-fit rounded-xl border-[1.5px] border-gray-100 bg-gray-100 p-1 pr-2.5"
    >
      <Icon name="locate" size={25} />
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
