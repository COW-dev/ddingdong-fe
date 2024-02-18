import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import LocalUserForm from '@/components/event/LocalUserForm';
import useModal from '@/hooks/common/useModal';
import isNavActive from '@/utils/isNavActive';

const navItems = [
  {
    id: 1,
    href: '/event',
    content: '동아리박람회',
  },
  {
    id: 2,
    href: '/notice',
    content: '공지사항',
  },
];

export default function UserHeader() {
  const router = useRouter();
  const curPath = router.pathname;
  const [hydrated, setHydrated] = useState(false);
  const { openModal, visible, closeModal, modalRef } = useModal();
  const eventStorage =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  function handleOpenModal() {
    openModal();
  }
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <header className="fixed z-20 flex h-16 w-full items-center justify-center border-b bg-white md:h-18">
      <div className="flex w-full max-w-6xl items-center justify-between px-6 md:px-16">
        <Link href="/" className="-ml-3 inline-block p-3">
          <Image
            src={'/logo.png'}
            width={1544}
            height={380}
            priority
            alt="ddingdong"
            className="w-30 md:w-34"
          />
        </Link>
        <nav className="-mr-4">
          <ul className="flex">
            <li key={navItems[0].id} className="mx-1">
              {eventStorage ? (
                <Link
                  href={navItems[0].href}
                  className={`inline-block p-3 font-semibold transition-colors hover:text-pink-400 ${
                    isNavActive(curPath, navItems[0].href)
                      ? 'text-pink-400'
                      : 'text-gray-500'
                  }`}
                >
                  {navItems[0].content}
                </Link>
              ) : (
                <h5
                  className="inline-block cursor-pointer p-3 font-semibold text-gray-500 transition-colors  hover:text-pink-400"
                  onClick={() => handleOpenModal()}
                >
                  동아리박람회
                </h5>
              )}
            </li>
            <li key={navItems[1].id} className="mx-1">
              <Link
                href={navItems[1].href}
                className={`inline-block p-3 font-semibold transition-colors hover:text-pink-500 ${
                  isNavActive(curPath, navItems[1].href)
                    ? 'text-pink-400'
                    : 'text-gray-500'
                }`}
              >
                {navItems[1].content}
              </Link>
            </li>
            {/* {navItems.map((item) => (
              <li key={item.id} className="mx-1">
                <Link
                  href={item.href}
                  className={`inline-block p-3 font-semibold transition-colors hover:text-blue-500 ${
                    isNavActive(curPath, item.href)
                      ? 'text-blue-500'
                      : 'text-gray-500'
                  }`}
                >
                  {item.content}
                </Link>
              </li>
            ))} */}
          </ul>
        </nav>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'동아리 박람회 이벤트 참여'}
        closeModal={closeModal}
      >
        <LocalUserForm closeModal={closeModal} />
      </Modal>
    </header>
  );
}
