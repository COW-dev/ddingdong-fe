import { ReactNode, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Caption1,
  Flex,
  Icon,
  IconButton,
  usePortal,
} from 'ddingdong-design-system';

import { memberQueryOptions } from '@/app/_api/queries/member';
import { downloadBlob } from '@/app/documents/_utils/downloadFile';
import { cn } from '@/lib/utils';

import { UploadModal } from './UploadModal';

export function ExcelDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isUploadModalOpen, openModal, closeModal } = usePortal();
  const { data: excelBlob } = useQuery(memberQueryOptions.excel());

  const handleDownloadMemberExcel = () => {
    if (!excelBlob) return;
    setIsOpen(false);
    downloadBlob(excelBlob, '동아리원 명단.xlsx');
  };

  const handleOpenModal = () => {
    setIsOpen(false);
    openModal();
  };

  return (
    <>
      <div className="relative inline-block">
        <div className="block sm:hidden">
          {/* TODO: 엑셀 이미지로 변경 */}
          <IconButton
            iconName="file"
            color="primary"
            size={24}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="엑셀 메뉴 열기"
          />
        </div>
        <div className="hidden sm:block">
          <Button
            variant="secondary"
            color="blue"
            size="md"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2"
          >
            Excel
            <Icon
              name="arrowDown"
              size={18}
              color="primary"
              className={cn(
                'transition-transform duration-200',
                isOpen && 'rotate-180',
              )}
            />
          </Button>
        </div>

        <div
          className={cn(
            'absolute right-0 z-20 mt-2 min-w-[9rem] rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200',
            isOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0',
          )}
        >
          <div className="m-2">
            <DropdownItem onClick={handleDownloadMemberExcel}>
              동아리원 다운받기
            </DropdownItem>
            <DropdownItem onClick={handleOpenModal}>
              동아리원 업로드
            </DropdownItem>
          </div>
        </div>
      </div>
      <UploadModal isOpen={isUploadModalOpen} onClose={closeModal} />
    </>
  );
}

function DropdownItem({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Flex
      as="button"
      alignItems="center"
      onClick={onClick}
      className="w-full gap-2 rounded-lg p-2 text-center hover:bg-gray-100 focus:bg-gray-100"
    >
      <Caption1>{children}</Caption1>
    </Flex>
  );
}
