'use client';

import { Caption1, Flex, IconButton, usePortal } from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import {
  useDeleteMember,
  useUpdateMemberInfo,
} from '@/app/_api/mutations/member';
import { Member } from '@/app/_api/types/member';
import { Position } from '@/constants/position';

import { useUpdateMember } from '../_hooks/useUpdateMember';

import { DeleteModal } from './DeleteModal';

type MemberInfoProps = {
  member: Member;
};

export default function MemberInfo({ member }: MemberInfoProps) {
  const { mutate: updateMutation } = useUpdateMemberInfo();
  const { mutate: deleteMutation } = useDeleteMember();
  const { isOpen: isDeleteModalVisible, openModal, closeModal } = usePortal();
  const {
    isEditing,
    memberInfo,
    startEditing,
    finishEditing,
    handleReset,
    handleMemberInfoChange,
    handlePositionNum,
  } = useUpdateMember(member);

  function handleSubmit() {
    if (!member.id) return;

    const submitData = {
      id: member.id,
      studentNumber: memberInfo.studentNumber,
      position: Position[memberInfo.position],
      phoneNumber: memberInfo.phoneNumber,
      name: memberInfo.name,
      department: memberInfo.department,
    };

    updateMutation(
      { member: submitData },
      {
        onSuccess: () => {
          toast.success('동아리원 정보가 수정되었습니다.');
          finishEditing();
        },
        onError: (error: Error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
        },
      },
    );
  }

  const handleDeleteConfirm = () => {
    if (member.id === undefined) return;
    deleteMutation(
      { id: member.id },
      {
        onSuccess: () => {
          toast.success('동아리원 정보가 삭제되었습니다.');
          closeModal();
        },
      },
    );
  };

  return (
    <>
      <Flex
        as="li"
        alignItems="center"
        justifyContent="between"
        className="w-full border-t border-gray-200 p-1"
      >
        <Flex
          dir="col"
          justifyContent="center"
          className={`mt-3 w-full rounded-xl p-3 ${isEditing && `bg-gray-100`}`}
        >
          <Flex alignItems="center" justifyContent="between" gap={2}>
            <input
              type="text"
              value={memberInfo.name}
              name="name"
              placeholder="이름 입력"
              className="text-md bg-inherit font-semibold outline-none"
              onChange={(e) => handleMemberInfoChange(e)}
              disabled={!isEditing}
            />
            <Flex gap={1}>
              {isEditing ? (
                <>
                  <IconButton
                    iconName="close"
                    size={20}
                    onClick={handleReset}
                  />
                  <IconButton
                    iconName="check"
                    color="primary"
                    size={20}
                    onClick={handleSubmit}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    iconName="write"
                    size={20}
                    onClick={startEditing}
                  />
                  <IconButton iconName="trash" size={20} onClick={openModal} />
                </>
              )}
            </Flex>
          </Flex>
          <div className="text-sm font-semibold text-gray-400">
            <Flex>
              <input
                type="text"
                name="studentNumber"
                placeholder="학번"
                value={memberInfo.studentNumber}
                className="text-md w-18 bg-inherit font-semibold outline-none"
                onChange={(e) => handleMemberInfoChange(e)}
                disabled={!isEditing}
              />
              |
              <input
                type="text"
                name="department"
                placeholder="학과"
                value={memberInfo.department}
                className="text-md ml-1 bg-inherit font-semibold outline-none"
                onChange={(e) => handleMemberInfoChange(e)}
                disabled={!isEditing}
              />
            </Flex>
            <Flex>
              <Flex alignItems="center" className="pr-1">
                <Caption1
                  weight="bold"
                  className={`bg-inherit ${isEditing ? `w-14` : `mr-1 w-16`}`}
                >
                  {memberInfo.position}
                </Caption1>
                <IconButton
                  iconName="arrowRight"
                  size={13}
                  className={`${!isEditing && `hidden`} -ml-[9px]`}
                  onClick={handlePositionNum}
                />
              </Flex>
              |
              <input
                type="text"
                name="phoneNumber"
                placeholder="전화번호"
                value={memberInfo.phoneNumber}
                className="text-md ml-1 bg-inherit font-semibold outline-none"
                onChange={(e) => handleMemberInfoChange(e)}
                disabled={!isEditing}
              />
            </Flex>
          </div>
        </Flex>
      </Flex>
      <DeleteModal
        name={memberInfo.name}
        isOpen={isDeleteModalVisible}
        onDelete={handleDeleteConfirm}
        onClose={closeModal}
      />
    </>
  );
}
