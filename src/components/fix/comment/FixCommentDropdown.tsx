import { useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Dot from '@/assets/dot.svg';
import { useDeleteFixComment } from '@/hooks/api/fixzone/useDeleteFixComment';
import { DeleteFixComment } from '@/types/fix';

export default function FixCommentDropdown({
  fixZoneId,
  commentId,
}: DeleteFixComment) {
  const [{ token }] = useCookies(['token']);
  const [open, setOpen] = useState<boolean>(false);

  const deleteMutation = useDeleteFixComment(fixZoneId);

  const handleClickDeleteButton = () => {
    deleteMutation.mutate({
      fixZoneId: fixZoneId,
      commentId: commentId,
      token,
    });
    setOpen(!open);
  };

  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="rotate-90"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <Image src={Dot} width={20} height={20} alt="더보기 버튼" />
      </button>
      {open && (
        <div
          id="dropdownHover"
          className="z-20 m-auto min-w-fit divide-y divide-gray-100 rounded-lg shadow "
        >
          <ul
            className="absolute -right-2 z-10 m-2 w-fit rounded-xl border-[1px] bg-white py-2 text-sm text-gray-700 shadow-lg"
            aria-labelledby="dropdownHoverButton"
          >
            <li
              className="block cursor-pointer px-4 py-2 font-semibold hover:bg-gray-100"
              onClick={handleClickDeleteButton}
            >
              삭제
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
