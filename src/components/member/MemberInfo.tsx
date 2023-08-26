import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Add from '@/assets/add.svg';
import Cancle from '@/assets/cancle-red.svg';
import RightArrow from '@/assets/rightArrow.svg';

import { Position } from '@/constants/text';
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
  const [positionNum, setPositionNum] = useState<number>(0);
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
  function handlePositionNum() {
    if (positionNum === 2) setPositionNum(0);
    else setPositionNum(positionNum + 1);
    setValue((prev) => ({
      ...prev,
      position: Object.keys(Position)[positionNum],
    }));
  }
  function handleCreateMember() {
    setPositionNum(0);
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
      position: '동아리원',
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
      members[index]?.phoneNumber === value.phoneNumber &&
      members[index]?.position === value.position &&
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
        className={`relative justify-center rounded-xl p-2 py-3 transition-colors hover:border-gray-200  ${
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
          className="text-md bg-inherit font-semibold outline-none"
          onChange={(e) => handleChange(e)}
          disabled={!isEditing}
        />
        <div className="text-sm text-gray-500">
          <div className={`flex rounded-lg font-semibold `}>
            <input
              type="text"
              name="studentNumber"
              placeholder="학번"
              value={value.studentNumber}
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
              disabled={!isEditing}
            />
          </div>
          <div className={`flex rounded-lg font-semibold `}>
            <div className="flex pr-1">
              <div
                className={`text-md bg-inherit font-semibold outline-none ${
                  isEditing ? `w-14` : `mr-1 w-16`
                }`}
              >
                {value.position}
              </div>
              <Image
                src={RightArrow}
                width={12}
                height={12}
                alt="next"
                className={`${!isEditing && `hidden`}`}
                onClick={handlePositionNum}
              />
            </div>
            |
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호"
              value={value.phoneNumber}
              className="text-md ml-1 bg-inherit font-semibold outline-none"
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
            alt="confirm"
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
