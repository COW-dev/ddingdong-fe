import { Title1, Body2, Flex } from 'ddingdong-design-system';

export function RankingHeader() {
  return (
    <div className="mb-[3.2rem]">
      <Title1 as="h1" weight="bold">
        이달의 피드 점수 현황
      </Title1>
      <Flex dir="col" gap={2} className="mt-[1.6rem]">
        <Body2 className="text-gray-400">
          매월 1일 이달의 피드가 선정됩니다.
        </Body2>
        <Body2 className="text-gray-400">
          1위를 차지한 동아리는 한 달간 메인 홈에 홍보 배너가 노출됩니다.
        </Body2>
      </Flex>
    </div>
  );
}
