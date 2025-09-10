import router from 'next/router';

import dayjs from 'dayjs';
import { Body2, Button, Flex } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';

type ClubInfoProps = Pick<
  ClubDetail,
  | 'leader'
  | 'phoneNumber'
  | 'location'
  | 'regularMeeting'
  | 'startDate'
  | 'endDate'
  | 'formId'
>;
export const ClubInfo = ({
  leader,
  phoneNumber,
  location,
  regularMeeting,
  startDate,
  endDate,
  formId,
}: ClubInfoProps) => {
  const now = dayjs();
  const isRecruitmentPeriod =
    now.isAfter(dayjs(startDate).startOf('day')) &&
    now.isBefore(dayjs(endDate).endOf('day'));

  const moveToApply = (id: number) => {
    if (!isRecruitmentPeriod) return;
    router.push(`/apply/${id}`);
  };

  return (
    <Flex alignItems="start" gap={4}>
      <Flex
        dir="col"
        justifyContent="center"
        className="w-full rounded-xl bg-gray-50 p-6 md:px-10 md:py-7 lg:w-[75%]"
      >
        <Flex className="flex w-full flex-col md:flex-row">
          <Flex className="mb-1.5 w-full max-w-[20rem]">
            <Body2 className="w-20 text-gray-500">회장</Body2>
            <Body2>{leader}</Body2>
          </Flex>
          <Flex className="mb-1.5">
            <Body2 className="w-20 text-gray-500">연락처</Body2>
            <Body2>{phoneNumber}</Body2>
          </Flex>
        </Flex>
        <Flex className="flex w-full flex-col md:flex-row">
          <Flex className="mb-1.5 w-full max-w-[20rem]">
            <Body2 className="w-20 text-gray-500">동아리방</Body2>
            <Body2>{location}</Body2>
          </Flex>
          <Flex className="mb-1.5 flex md:flex-row">
            <Body2 className="w-20 text-gray-500">모집기간</Body2>
            {startDate && endDate && (
              <>
                {startDate.replace(/-/g, '.')}
                <Body2 className="mx-1">~</Body2>
                {endDate.replace(/-/g, '.')}
              </>
            )}
            {!startDate && !endDate && (
              <Body2 className="w-20 text-gray-500">모집예정</Body2>
            )}
          </Flex>
        </Flex>
        <Flex className="w-full">
          <Body2 className="w-20 text-gray-500">정기모임</Body2>
          <Body2>{regularMeeting}</Body2>
        </Flex>
      </Flex>
      <Button
        variant="primary"
        size="lg"
        onClick={() => moveToApply(Number(formId))}
        disabled={!isRecruitmentPeriod}
        className="text-md fixed bottom-6 h-14 w-[90%] font-semibold lg:static lg:w-[25%]"
      >
        {isRecruitmentPeriod ? '지원하기' : '모집 마감'}
      </Button>
    </Flex>
  );
};
