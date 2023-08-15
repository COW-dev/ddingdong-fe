import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Add from '@/assets/add.svg';
import Cancle from '@/assets/cancle-red.svg';

import { Member } from '@/types/member';

type Props = {
  name: string;
  studentId: string;
  members: Member[];
  id: number;
  department: string;
  isEditing: boolean;
  setMembers: Dispatch<SetStateAction<Member[]>>;
};
export default function MemberInfo({
  department,
  studentId,
  name,
  id,
  isEditing,
  members,
  setMembers,
}: Props) {
  const [value, setValue] = useState<Member>({
    id,
    name,
    studentId,
    department,
  });
  const [isEditItem, setisEditItem] = useState<boolean>(false);
  function handleEditable() {
    setisEditItem(true);
  }
  function handleUneditable() {
    setisEditItem(false);
    handleModifyMember();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  function handleMember() {
    id === 0 ? handleCreateMember() : handleDeleteMember();
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      id === 0 &&
      event.key === 'Enter' &&
      event.nativeEvent.isComposing === false
    ) {
      handleCreateMember();
    }
  }

  function handleCreateMember() {
    setMembers([
      ...members,
      { ...value, id: members[members.length - 1].id + 1 },
    ]);
    setValue({ id: 0, name: '', studentId: '', department: '' });
  }
  function handleDeleteMember() {
    const newMembers = [...members];
    const index = newMembers.findIndex((member) => member.id === id);
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }
  function handleModifyMember() {
    const index = members.findIndex((member) => member.id === id);
    if (
      members[index]?.department === value.department &&
      members[index]?.studentId === value.studentId &&
      members[index]?.name === value.name
    )
      return;
    const newMembers = members.map((member) =>
      member.id === id ? value : member,
    );
    setMembers(newMembers);
  }

  return (
    <li className="border-t border-gray-200 p-1 ">
      <div
        className={`relative rounded-xl  p-2 py-3 transition-colors hover:border-gray-200  ${
          isEditItem && `bg-gray-100`
        }`}
        key={`member-${id}`}
        onMouseEnter={handleEditable}
        onMouseLeave={handleUneditable}
      >
        <input
          type="text"
          value={value.name}
          name="name"
          placeholder="이름 입력"
          className="text-md bg-inherit font-semibold outline-none"
          onChange={(e) => handleChange(e)}
          disabled={!isEditing}
        />
        <div className="flex items-center text-sm  text-gray-500">
          <div className={`flex rounded-lg font-semibold `}>
            <input
              type="text"
              name="studentId"
              placeholder="학번"
              value={value.studentId}
              className="text-md w-18  bg-inherit font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
            />
            |
            <input
              type="text"
              name="department"
              placeholder="학과"
              value={value.department}
              className="text-md ml-1  bg-inherit font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <Image
            src={id === 0 ? Add : Cancle}
            width={10}
            height={10}
            alt="delete"
            onClick={handleMember}
            className={`absolute right-5 top-5 text-red-500  ${
              !isEditItem && `invisible`
            }`}
          />
        )}
      </div>
    </li>
  );
}
