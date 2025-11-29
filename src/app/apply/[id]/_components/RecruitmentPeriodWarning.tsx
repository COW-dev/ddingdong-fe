import { Body1, Flex } from 'ddingdong-design-system';

type RecruitmentPeriodWarningProps = {
  startDate: string;
  endDate: string;
};

export function RecruitmentPeriodWarning({
  startDate,
  endDate,
}: RecruitmentPeriodWarningProps) {
  return (
    <Flex
      dir="col"
      alignItems="center"
      gap={6}
      className="justify-center pt-10 pb-20 text-center"
    >
      <Body1 weight="bold" className="m-2 rounded-full bg-red-500 p-2 pb-2.5">
        <span className="text-5xl">⚠️</span>
      </Body1>
      <Body1 weight="bold" className="text-3xl text-gray-800">
        현재 지원 기간이 아닙니다.
      </Body1>
      <Body1 weight="medium" className="text-gray-600">
        지원 가능 기간: {startDate} ~ {endDate}
      </Body1>
    </Flex>
  );
}
