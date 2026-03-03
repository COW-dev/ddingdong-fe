import { Body2, Flex, Icon, Title1, Tooltip } from 'ddingdong-design-system';

export function EmailHeader() {
  return (
    <Flex
      dir="col"
      alignItems="start"
      justifyContent="between"
      gap={2}
      className="pt-7 md:pt-10"
    >
      <Title1 weight="bold">지원 결과 이메일 전송</Title1>
      <Flex dir="row" alignItems="center" gap={2}>
        <Body2 weight="semibold" className="text-gray-500">
          전송대상을 선택하고, 전송할 내용을 작성해 주세요.
        </Body2>
        <Tooltip
          color="gray"
          content={`"지원자명"은 각 지원자의 이름으로 자동 변경되며, 수정이 불가합니다.\n필요할 경우 직접 "지원자명"을 입력해 추가로 사용할 수 있습니다.`}
        >
          <Icon
            name="information"
            color="gray"
            size={20}
            className="hidden md:block"
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
