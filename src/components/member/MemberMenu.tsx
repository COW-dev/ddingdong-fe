import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { Position } from '@/constants/text';
import { useUpdateMembers } from '@/hooks/api/member/useMembers';
import { Member } from '@/types/club';
import Dropdown from '../common/Dropdown';

interface MemberMenuProps {
  members: Member[];
  organicMember: Member[];
  setMembers: (members: Member[]) => void;
}

function MemberMenu({ members, organicMember, setMembers }: MemberMenuProps) {
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
  }

  function handleSubmit() {
    // if (members.length === organicMember.length) {
    //   return handleEditting();
    // }

    const parsedMember = parsePosition();
    const formData = new FormData();
    const member = {
      clubMemberList: parsedMember,
    };

    file && formData.append('file', file);
    formData.append('token', token);
    return mutation.mutate(formData);
  }
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <div className="flex">
        <Dropdown file={file} setFile={setFile} />
      </div>
    </>
  );
}

export default MemberMenu;
