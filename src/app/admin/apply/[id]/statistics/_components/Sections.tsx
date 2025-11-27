import { PropsWithChildren } from 'react';

import { Body3, Flex } from 'ddingdong-design-system';

type Props = {
  focusSection: string;
  setFocusSection: (section: string) => void;
  sections: string[];
};

export default function Sections({
  focusSection,
  setFocusSection,
  sections,
}: Props) {
  return (
    <SectionContainer>
      {sections.map((section: string) => (
        <Body3
          key={section}
          className={`cursor-pointer rounded-md border border-b-0 border-gray-200 px-3 py-1 ${
            focusSection === section
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setFocusSection(section)}
        >
          {section}
        </Body3>
      ))}
    </SectionContainer>
  );
}

function SectionContainer({ children }: PropsWithChildren) {
  return (
    <Flex alignItems="center" gap={1} className="mx-4">
      {children}
    </Flex>
  );
}
