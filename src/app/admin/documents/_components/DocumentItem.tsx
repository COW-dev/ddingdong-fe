'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body1,
  Body3,
  Flex,
  IconButton,
  usePortal,
} from 'ddingdong-design-system';

import { useDeleteDocument } from '@/app/_api/mutations/document';
import { documentQueryOptions } from '@/app/_api/queries/document';
import { Document } from '@/app/_api/types/document';
import { DocumentModal } from '@/app/documents/_components/DocumentModal';
import { downloadAll } from '@/app/documents/_utils/downloadFile';
import { RoleType } from '@/constants/role';

import { TrashModal } from './TrashModal';

type DocumentItemProps = {
  role: keyof RoleType;
  document: Document;
};

export function DocumentItem({ role, document }: DocumentItemProps) {
  const {
    isOpen: isDocumentModalOpen,
    openModal: openDocumentModal,
    closeModal: closeDocumentModal,
  } = usePortal();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = usePortal();
  const { data: documentItem } = useSuspenseQuery(
    documentQueryOptions.detail(document.id),
  );

  const { mutate: deleteDocument } = useDeleteDocument();

  return (
    <>
      <Flex
        as="li"
        justifyContent="between"
        onClick={openDocumentModal}
        className="cursor-pointer border-b border-gray-200 p-3.5 md:p-5"
      >
        <Flex dir="col" gap={1}>
          <Body1>{document.title}</Body1>
          <Body3 weight="medium" className="text-gray-300">
            {new Date(document.createdAt).toLocaleDateString('ko-KR')}
          </Body3>
        </Flex>
        <Flex dir="row" alignItems="center" gap={role === 'ROLE_ADMIN' ? 6 : 1}>
          <IconButton
            iconName="download"
            color="gray"
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              downloadAll(documentItem.files);
            }}
          />
          {role === 'ROLE_ADMIN' && (
            <IconButton
              iconName="trash"
              color="red"
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                openDeleteModal();
              }}
            />
          )}
        </Flex>
      </Flex>
      <DocumentModal
        id={document.id}
        isOpen={isDocumentModalOpen}
        closeModal={closeDocumentModal}
      />
      <TrashModal
        title={document.title}
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        onDelete={() => deleteDocument(document.id)}
      />
    </>
  );
}
