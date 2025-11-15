import { Body1, Body2, Flex, TextArea } from 'ddingdong-design-system';

import { ApplyContentContainer } from './ApplicantInfo';

type ApplicantNoteProps = {
  note: string;
  onNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdateNote: () => void;
};

export function ApplicantNote({
  note,
  onNoteChange,
  onUpdateNote,
}: ApplicantNoteProps) {
  return (
    <ApplyContentContainer>
      <Flex dir="col" gap={2} className="w-full">
        <Body1 weight="bold" className="mb-2 text-blue-500">
          메모
        </Body1>
        <TextArea
          rows={2}
          maxLength={250}
          value={note}
          onChange={onNoteChange}
          className="w-full"
        />
        <Flex justifyContent="end" className="w-full">
          <Body2
            weight="bold"
            className="cursor-pointer text-gray-400"
            onClick={onUpdateNote}
          >
            저장하기
          </Body2>
        </Flex>
      </Flex>
    </ApplyContentContainer>
  );
}
