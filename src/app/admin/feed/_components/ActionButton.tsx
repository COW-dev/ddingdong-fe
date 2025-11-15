import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PropsWithChildren } from 'react';

import { Button, Flex, IconButton } from 'ddingdong-design-system';

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
          <EditModeButtons
            onEditModeChange={onEditModeChange}
            onDeleteClick={onDeleteClick}
            selectedFeed={selectedFeed}
            deleteButtonText="삭제하기"
          />
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
          <EditModeButtons
            onEditModeChange={onEditModeChange}
            onDeleteClick={onDeleteClick}
            selectedFeed={selectedFeed}
            deleteButtonText="삭제"
          />
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

type EditModeButtonsProps = Pick<
  ActionButtonProps,
  'onEditModeChange' | 'onDeleteClick' | 'selectedFeed'
> & {
  deleteButtonText?: string;
};

function CancelButton({
  onEditModeChange,
}: {
  onEditModeChange: (editMode: boolean) => void;
}) {
  return (
    <Button
      variant="tertiary"
      size="md"
      onClick={() => onEditModeChange(false)}
      className="text-md rounded-xl bg-gray-100 px-2 py-2 font-bold text-gray-500 transition-colors hover:bg-gray-300 md:w-auto md:px-4 md:py-2.5 md:text-lg"
    >
      취소
    </Button>
  );
}

function DeleteButton({
  onDeleteClick,
  selectedFeed,
  text = '삭제하기',
}: {
  onDeleteClick: () => void;
  selectedFeed: number | null;
  text?: string;
}) {
  return (
    <Button
      variant="secondary"
      size="md"
      color="red"
      onClick={onDeleteClick}
      disabled={!selectedFeed}
      className="text-md rounded-xl bg-red-50 px-2 py-2 font-bold text-red-400 hover:bg-red-100 disabled:cursor-not-allowed md:px-4 md:py-3 md:text-lg"
    >
      {text}
    </Button>
  );
}

function EditModeButtons({
  onEditModeChange,
  onDeleteClick,
  selectedFeed,
  deleteButtonText = '삭제하기',
}: EditModeButtonsProps) {
  return (
    <>
      <CancelButton onEditModeChange={onEditModeChange} />
      <DeleteButton
        onDeleteClick={onDeleteClick}
        selectedFeed={selectedFeed}
        text={deleteButtonText}
      />
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
