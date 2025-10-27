import { Dispatch, SetStateAction } from 'react';
import { StudentInfo } from '@/types/report';
import { Member } from '@/app/_api/types/member';
import { useParticipantSelect } from '../../../../../../components/report/useParticipantSelect';
import { Caption1, Flex } from 'ddingdong-design-system';

type Props = {
  name?: string;
  setData: Dispatch<SetStateAction<StudentInfo[]>>;
  members?: Array<Member>;
  id: number;
};

export default function ParticipantSelect({
  name,
  setData,
  members = [],
  id,
}: Props) {
  const {
    keyword,
    filteredList,
    isEditing,
    handleKeywordChange,
    handleFocus,
    handleBlur,
    handleSelectMember,
  } = useParticipantSelect({
    name,
    setData,
    members,
    id,
  });

  return (
    <div className="relative">
      <input
        type="text"
        value={keyword}
        onChange={(e) => handleKeywordChange(e.target.value)}
        className="px-4 py-2 outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        className={`${
          !isEditing && `hidden`
        } fixed z-10 mt-2 h-fit max-h-[50vh] w-56 overflow-scroll rounded-md border border-gray-100 bg-white shadow-lg`}
      >
        <div tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>
          {filteredList?.map((item) => (
            <Flex
              key={item.studentNumber}
              className="gap-5 p-4 hover:bg-gray-50"
              onMouseDown={() => handleSelectMember(item)}
            >
              <Caption1 weight="normal">{item.name}</Caption1>
              <Caption1 weight="normal" className="text-gray-400">
                {item.studentNumber}
              </Caption1>
            </Flex>
          ))}
        </div>
      </div>
    </div>
  );
}
