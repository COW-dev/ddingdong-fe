import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import CancelIcon from '@/assets/cancel-red.svg';
import CheckIcon from '@/assets/check_blue.svg';
import EditIcon from '@/assets/edit.svg';
import RightArrow from '@/assets/rightArrow.svg';

import { Position } from '@/constants/text';
import { useUpdateMembers } from '@/hooks/api/member/useUpdateMembers';
import { Member } from '@/types/club';

type MemberInfoProps = {
  member: Member;
};

export default function MemberInfo({ member }: MemberInfoProps) {
  const [{ token }] = useCookies(['token']);
  const mutation = useUpdateMembers();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<Member>(member);
  const [positionNum, setPositionNum] = useState<number>(0);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handlePositionNum() {
    if (positionNum === 2) setPositionNum(0);
    else setPositionNum(positionNum + 1);
    setValue((prev) => ({
      ...prev,
      position: Object.keys(Position)[positionNum],
    }));
  }

  function handleSubmit() {
    setIsEditing(false);
    const { id, studentNumber, position, phoneNumber, name, department } =
      value;
    const submitData = {
      studentNumber,
      position: Position[position],
      phoneNumber,
      name,
      department,
    };

    if (!id) return;
    mutation.mutate({ member: submitData, id, token });
  }

  return (
    <li className="border-t border-gray-200 p-1">
      <div
        className={`relative justify-center rounded-xl p-2 py-3 transition-colors hover:border-gray-200  ${
          isEditing && `bg-gray-100`
        }`}
        key={member.id}
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
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="absolute right-5 top-5">
          {isEditing ? (
            <div className="flex gap-2">
              <Image
                src={CancelIcon}
                width={10}
                height={10}
                alt="CancelIcon"
                onClick={() => setIsEditing(false)}
              />
              <Image
                src={CheckIcon}
                width={18}
                height={18}
                alt="CheckIcon"
                onClick={handleSubmit}
              />
            </div>
          ) : (
            <Image
              src={EditIcon}
              width={11}
              height={11}
              alt="EditIcon"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </li>
  );
}
