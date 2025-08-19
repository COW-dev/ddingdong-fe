import React from 'react';
import { useCookies } from 'react-cookie';
import AddMemberModal, {
  MemberFormData,
} from '@/components/member/AddMemberModal';
import { useAddMember } from '@/hooks/api/member/useAddMember';
import useModal from '@/hooks/common/useModal';

export default function AddMemberButton() {
  const { visible, modalRef, openModal, closeModal } = useModal();
  const [cookies] = useCookies(['token']);
  const mutation = useAddMember();

  const handleConfirm = (data: MemberFormData) => {
    const token = cookies.token;
    if (!token) return;

    mutation.mutate({ token, member: data });
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-22.5 whitespace-nowrap rounded-lg bg-blue-100 px-2 py-2 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-200 md:w-34 md:px-7"
      >
        명단 추가하기
      </button>

      <AddMemberModal
        visible={visible}
        closeModal={closeModal}
        modalRef={modalRef}
        onConfirm={handleConfirm}
      />
    </>
  );
}
