import { Body2, Flex, Radio, RadioItem } from 'ddingdong-design-system';

type SelectSectionProps = {
  sections: string[];
  selectedSection: string | undefined;
  onSectionSelect: (section: string) => void;
};

export function SelectSection({
  sections,
  selectedSection,
  onSectionSelect,
}: SelectSectionProps) {
  const availableSections = sections.filter((section) => section !== '공통');

  return (
    <Flex
      dir="col"
      alignItems="start"
      className="w-full rounded-xl border border-gray-200 px-6 py-5"
    >
      <Body2 className="px-2 py-2 text-xl font-bold text-blue-500">
        지원분야를 선택해주세요.
      </Body2>
      <Radio value={selectedSection || ''} className="w-full">
        {availableSections.map((section) => (
          <Flex
            key={section}
            dir="row"
            alignItems="center"
            gap={2}
            className="w-full cursor-pointer rounded-lg px-2 py-2 transition-colors hover:bg-gray-100"
            onClick={() => onSectionSelect(section)}
          >
            <RadioItem value={section} className="size-6" />
            <Body2
              weight="semibold"
              className={`py-1 transition-colors ${
                selectedSection === section ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              {section}
            </Body2>
          </Flex>
        ))}
      </Radio>
    </Flex>
  );
}
