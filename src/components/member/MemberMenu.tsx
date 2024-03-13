import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Modal from '@/components/common/Modal';
import MemberUpload from '@/components/member/MemberUpload';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Position } from '@/constants/text';
import { useUpdateMembers } from '@/hooks/api/member/useMembers';
import useModal from '@/hooks/common/useModal';
import { Member } from '@/types/club';

interface MemberMenuProps {
  handleEditting: () => void;
  members: Member[];
  isEditing: boolean;
  organicMember: Member[];
  setMembers: (members: Member[]) => void;
}

function MemberMenu({
  handleEditting,
  members,
  isEditing,
  organicMember,
  setMembers,
}: MemberMenuProps) {
  const mutation = useUpdateMembers();
  const [{ token }] = useCookies(['token']);

  function parsePosition() {
    const parsedMember: Member[] = [];
    members.map((member) => {
      parsedMember.push({
        ...member,
        position: Position[member.position],
      });
    });
    return parsedMember;
  }

  function handleClickCancleButton() {
    setMembers(organicMember);
    handleEditting();
  }

  function handleSubmit() {
    const parsedMember = parsePosition();
    const formData = new FormData();
    const member = {
      clubMemberList: parsedMember,
    };
    formData.append(
      'data',
      new Blob([JSON.stringify(member)], { type: 'application/json' }),
    );
    file && formData.append('file', file);
    formData.append('token', token);
    handleEditting();
    return mutation.mutate(formData);
  }

  const { openModal, visible, closeModal, modalRef } = useModal();
  const [file, setFile] = useState<File | null>(null);

  const URL =
    'https://ddingdong-file.s3.ap-northeast-2.amazonaws.com/files/excel/동아리원_명단_수정_양식.xlsx';

  return (
    <>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleClickCancleButton}
            className="cursor-pointer rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-500"
          >
            취소
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Exel</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuLabel>Exel로 동아리원 관리</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                <a href={URL} download target="_blank">
                  Excel 양식 다운로드
                </a>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={openModal}>
                Excel로 업로드
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <button
          onClick={isEditing ? handleSubmit : handleEditting}
          className="cursor-pointer rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-500"
        >
          {isEditing ? '저장' : '직접 수정'}
        </button>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'동아리원 엑셀 업로드'}
        closeModal={closeModal}
      >
        <MemberUpload closeModal={closeModal} file={file} setFile={setFile} />
      </Modal>
    </>
  );
}

export default MemberMenu;
