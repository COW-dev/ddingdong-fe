import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
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
import Dropdown from '../common/Dropdown';

interface MemberMenuProps {
  handleEditting: () => void;
  members: Member[];
  isEditing: boolean;
  organicMember: Member[];
  setMembers: (members: Member[]) => void;
  isAdding: boolean;
}

function MemberMenu({
  handleEditting,
  members,
  isEditing,
  organicMember,
  setMembers,
  isAdding,
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
    if (isAdding) {
      return toast.error(`수정중인 작업을 마무리하고 저장해주세요.`);
    }

    // if (members.length === organicMember.length) {
    //   return handleEditting();
    // }

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
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <div className="flex">
        {isEditing ? (
          <button
            onClick={handleClickCancleButton}
            className="cursor-pointer rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-500"
          >
            취소
          </button>
        ) : (
          <Dropdown file={file} setFile={setFile} />
        )}
        <button
          onClick={isEditing ? handleSubmit : handleEditting}
          className="ml-3 cursor-pointer rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200"
        >
          {isEditing ? '저장' : '직접 수정'}
        </button>
      </div>
    </>
  );
}

export default MemberMenu;
