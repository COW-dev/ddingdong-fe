import Link from "next/link";
import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  function openFixZone() {
    const windowOptions = 'width=650,height=650,scrollbars,resizable=no';
    const fixZoneWindow = window.open('fixzone', 'fixzone', windowOptions);
    if (!fixZoneWindow) {
      alert('팝업 차단이 활성화되어 있습니다. 팝업 차단을 해제해주세요.');
    }
  }
  return (
  <>
    <button
      id="dropdownHoverButton"
      data-dropdown-toggle="dropdownHover"
      data-dropdown-trigger="hover"
      className={` inline-flex items-center text-blue-500 rounded-xl min-w-fit bg-blue-100 px-5 py-2.5 text-center text-sm md:text-md font-bold hover:bg-blue-200 focus:outline-none ${
        open ? 'active' : ''
      } `}
      type="button"
      onClick={handleOpen}
    >
      동아리 관리하기
      <svg
        className="ml-2.5 h-2.5 w-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    {open && (
      <div
        id="dropdownHover"
        className=' z-20 relative active min-w-fit divide-y divide-gray-100 rounded-lg bg-blue-200 shadow m-auto '
      >
        <ul
          className=" absolute w-36 right-0 mt-12 z-10 py-2 text-sm text-gray-700 rounded-xl bg-white shadow-lg border-[1px]"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <div
              onClick={openFixZone}
              className="block px-4 py-2 hover:bg-blue-100 font-semibold"
            >
              Fix:Zone
            </div>
          </li>
          <li>
          <Link
            href="/club/my/score"
            className="block px-4 py-2 hover:bg-blue-100 font-semibold"
          >
            <div>동아리 점수 확인</div>
          </Link>
          </li>
          <li>
            <Link
              href="/member"
              className="block px-4 py-2 hover:bg-blue-100 font-semibold"
            >
              동아리원 수정하기
            </Link>
          </li>
        </ul>
      </div>
    )}
  </>
  );
}
