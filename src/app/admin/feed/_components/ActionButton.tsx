import Link from 'next/link';

import { Button, Flex, IconButton } from 'ddingdong-design-system';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';

type ActionButtonProps = {
  editMode: boolean;
  selectedFeed: number | null;
  onEditModeChange: (editMode: boolean) => void;
  onDeleteClick: () => void;
};

export function ActionButton({
  editMode,
  selectedFeed,
  onEditModeChange,
  onDeleteClick,
}: ActionButtonProps) {
  const router = useRouter();

  return (
    <>
      <DesktopActionButton>
        {editMode ? (
          <>
            <Button
              variant="tertiary"
              size="md"
              onClick={() => onEditModeChange(false)}
              className="text-md rounded-xl bg-gray-100 px-2 py-2 font-bold text-gray-500 transition-colors hover:bg-gray-300 md:w-auto md:px-4 md:py-2.5 md:text-lg"
            >
              취소
            </Button>
            <Button
              variant="secondary"
              size="md"
              color="red"
              onClick={onDeleteClick}
              disabled={!selectedFeed}
              className={`${
                !selectedFeed && 'disabled:cursor-not-allowed'
              } text-md rounded-xl bg-red-50 px-2 py-2 font-bold text-red-400 hover:bg-red-100 md:px-4 md:py-3 md:text-lg`}
            >
              삭제하기
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              color="red"
              size="sm"
              onClick={() => onEditModeChange(true)}
              className="text-md font-semibold md:text-lg"
            >
              선택 삭제
            </Button>
            <Link
              href="/feed/new"
              className="text-md rounded-xl bg-blue-100 px-3 py-2 font-semibold text-blue-500 hover:bg-blue-200 md:px-4 md:py-3 md:text-lg"
            >
              파일 업로드
            </Link>
          </>
        )}
      </DesktopActionButton>

      <MobileActionButton>
        {editMode ? (
          <>
            <Button
              variant="tertiary"
              size="md"
              onClick={() => onEditModeChange(false)}
              className="text-md rounded-xl bg-gray-100 px-2 py-2 font-bold text-gray-500 transition-colors hover:bg-gray-300 md:w-auto md:px-4 md:py-2.5 md:text-lg"
            >
              취소
            </Button>
            <Button
              variant="secondary"
              size="md"
              color="red"
              onClick={onDeleteClick}
              disabled={!selectedFeed}
              className={`${
                !selectedFeed && 'disabled:cursor-not-allowed'
              } text-md rounded-xl bg-red-50 px-2 py-2 font-bold text-red-400 hover:bg-red-100 md:px-4 md:py-3 md:text-lg`}
            >
              삭제
            </Button>
          </>
        ) : (
          <>
            <IconButton
              iconName="trash"
              color="red"
              size={24}
              onClick={() => onEditModeChange(true)}
            />

            <IconButton
              iconName="write"
              color="primary"
              size={24}
              onClick={() => router.push('/feed/new')}
            />
          </>
        )}
      </MobileActionButton>
    </>
  );
}

function DesktopActionButton({ children }: PropsWithChildren) {
  return (
    <Flex gap={3} alignItems="center" className="hidden md:flex">
      {children}
    </Flex>
  );
}

function MobileActionButton({ children }: PropsWithChildren) {
  return (
    <Flex gap={3} alignItems="center" className="flex md:hidden">
      {children}
    </Flex>
  );
}
