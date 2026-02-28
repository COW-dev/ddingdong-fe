import { Title1, Flex, Body3 } from 'ddingdong-design-system';

export function RankingHeader() {
  return (
    <Flex dir="col" className="gap-1 md:gap-2">
      <Title1 as="h1" weight="bold">
        이달의 피드 점수 현황
      </Title1>
      <Flex dir="col">
        <Body3 className="text-gray-400">
          매월 1일 이달의 피드가 선정됩니다.
        </Body3>
        <Body3 className="text-gray-400">
          1위를 차지한 동아리는 한 달간 메인 홈에 홍보 배너가 노출됩니다.
        </Body3>
      </Flex>
    </Flex>
  );
}
