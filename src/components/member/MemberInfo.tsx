import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Add from '@/assets/add.svg';
import Cancle from '@/assets/cancle-red.svg';

import { Member } from '@/types/club';

type Props = {
  member: Member;
  isEditing: boolean;
  members: Member[];
  setMembers: Dispatch<SetStateAction<Member[]>>;
};
export default function MemberInfo({
  member,
  isEditing,
  members,
  setMembers,
}: Props) {
  const [value, setValue] = useState<Member>(member);
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
    member.id === 0 ? handleCreateMember() : handleDeleteMember();
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      member.id === 0 &&
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
    setValue({
      id: 0,
      name: '',
      studentNumber: '',
      department: '',
      phoneNumber: '',
      position: '',
    });
  }
  function handleDeleteMember() {
    const newMembers = [...members];
    const index = newMembers.findIndex(
      (newMember) => newMember.id === member.id,
    );
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }
  function handleModifyMember() {
    const index = members.findIndex((newMember) => newMember.id === member.id);
    if (
      members[index]?.department === value.department &&
      members[index]?.studentNumber === value.studentNumber &&
      members[index]?.name === value.name
    )
      return;
    const newMembers = members.map((newMember) =>
      newMember.id === member.id ? value : newMember,
    );
    setMembers(newMembers);
  }

  return (
    <li className="border-t border-gray-200 p-1 ">
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl p-2 py-3 transition-colors hover:border-gray-200  ${
          isEditItem && `bg-gray-100`
        }`}
        key={`member-${member.id}`}
        onMouseEnter={handleEditable}
        onMouseLeave={handleUneditable}
      >
        <input
          type="text"
          value={value?.name}
          name="name"
          placeholder="이름 입력"
          className="text-md bg-inherit text-center font-semibold outline-none"
          onChange={(e) => handleChange(e)}
          disabled={!isEditing}
        />
        <div className="text-sm text-gray-500">
          <div className={`flex justify-center rounded-lg font-semibold `}>
            <input
              type="text"
              name="studentNumber"
              placeholder="학번"
              value={value?.studentNumber}
              className="text-md bg-inherit text-end font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
            />
            <div className="mx-3">|</div>
            <input
              type="text"
              name="department"
              placeholder="학과"
              value={value?.department}
              className="text-md ml-1  bg-inherit font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
            />
          </div>
          <div className={`flex justify-center rounded-lg font-semibold `}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호"
              value={value?.phoneNumber}
              className="text-md bg-inherit text-end font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
            />
            <div className="mx-3">|</div>
            <input
              type="text"
              name="position"
              placeholder="역할"
              value={value?.position}
              className="text-md ml-1  bg-inherit font-semibold outline-none"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              disabled={!isEditing}
            />
          </div>
        </div>
        {isEditing && (
          <Image
            src={member.id === 0 ? Add : Cancle}
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
