import { Body3, Flex, Icon, Input } from 'ddingdong-design-system';

export function CommonQuestionPreview() {
  return (
    <Flex
      dir="col"
      gap={5}
      className="mb-3 rounded-lg border border-gray-200 px-6 py-7"
    >
      <Flex dir="row" gap={3} className="flex-wrap md:flex-nowrap">
        <Input
          placeholder="이름을 입력해 주세요."
          disabled
          onClickReset={() => {}}
        />
        <Input
          placeholder="학번을 입력해 주세요."
          disabled
          onClickReset={() => {}}
        />
        <Flex
          alignItems="center"
          justifyContent="between"
          className="w-full rounded-xl border border-gray-200 px-[16px] py-[14px]"
        >
          <Body3 weight="normal" className="text-gray-400">
            학과를 선택해주세요.
          </Body3>
          <Icon name="arrowDown" color="gray" size={16} />
        </Flex>
      </Flex>

      <Flex dir="row" gap={3} className="flex-wrap md:flex-nowrap">
        <Input
          placeholder="전화번호를 입력해 주세요."
          disabled
          onClickReset={() => {}}
        />
        <Input
          placeholder="이메일을 입력해 주세요."
          disabled
          onClickReset={() => {}}
        />
      </Flex>

      <Body3
        weight="semibold"
        color="gray-500"
        className="w-full border-t border-gray-200 pt-6 text-right text-gray-400"
      >
        * 해당 질문은 기본제공 질문입니다.
      </Body3>
    </Flex>
  );
}
