import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { Position } from '@/constants/text';
import { useUpdateMembers } from '@/hooks/api/member/useUploadMembers';
import { Member } from '@/types/club';
import ExelDropdown from '../common/ExelDropdown';

interface MemberMenuProps {
  members: Member[];
  organicMember: Member[];
  setMembers: (members: Member[]) => void;
}

function MemberMenu({ members, organicMember, setMembers }: MemberMenuProps) {
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
