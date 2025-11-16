import { memo } from 'react';

import { Flex, IconButton } from 'ddingdong-design-system';

type SectionTabsProps = {
  sections: string[];
  focusSection: string;
  onSectionChange: (section: string) => void;
  onAddSection?: VoidFunction;
  onEditSection?: (section: string) => void;
  onDeleteSection?: (section: string) => void;
  readOnly?: boolean;
};

const REQUIRED_SECTIONS = '공통' as const;
function SectionTabsComponent({
  sections,
  focusSection,
  onSectionChange,
  onAddSection,
  onEditSection,
  onDeleteSection,
  readOnly = false,
}: SectionTabsProps) {
  return (
    <Flex
      alignItems="center"
      gap={1}
      className="relative border-b-0 px-4 font-semibold"
    >
      {sections?.map((name) => (
        <Flex
          key={name}
          alignItems="center"
          gap={name !== REQUIRED_SECTIONS ? 1 : 0}
          className={`rounded-md rounded-b-none border border-b-0 border-gray-200 ${
            focusSection === name
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500'
          }`}
        >
          <button
            type="button"
            onClick={() => onSectionChange(name)}
            className="cursor-pointer px-3 py-1"
          >
            {name}
          </button>
          {name !== REQUIRED_SECTIONS && !readOnly && (
            <>
              <IconButton
                iconName="write"
                size={16}
                color="gray"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditSection?.(name);
                }}
              />
              <IconButton
                iconName="close"
                size={16}
                color="gray"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSection?.(name);
                }}
                className="mr-1"
              />
            </>
          )}
        </Flex>
      ))}
      {!readOnly && onAddSection && (
        <button
          type="button"
          onClick={onAddSection}
          className="cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 bg-white px-3 py-1 text-gray-500 hover:bg-gray-50"
        >
          섹션 추가하기 +
        </button>
      )}
    </Flex>
  );
}

export const SectionTabs = memo(SectionTabsComponent);
