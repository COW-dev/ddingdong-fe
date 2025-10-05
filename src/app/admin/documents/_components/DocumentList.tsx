'use client';

import { PropsWithChildren, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body1,
  Body3,
  Button,
  Flex,
  Pagination,
  Title1,
  usePortal,
} from 'ddingdong-design-system';

import { documentQueryOptions } from '@/app/_api/queries/document';
import { RoleType } from '@/constants/role';

import { DocumentItem } from './DocumentItem';
import { UploadModal } from './UploadModal';

export function DocumentList({ role }: { role: keyof RoleType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, openModal, closeModal } = usePortal();
  const { data: documentData } = useSuspenseQuery(
    documentQueryOptions.all(currentPage),
  );

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Title1 weight="bold" className="py-7 md:py-10">
          자료실
        </Title1>
        {role === 'ROLE_ADMIN' && (
          <Button size="md" variant="primary" color="blue" onClick={openModal}>
            <Body3 weight="bold">업로드</Body3>
          </Button>
        )}
      </Flex>
      {documentData.documents.length === 0 ? (
        <Body1 className="text-gray-400">자료가 없습니다.</Body1>
      ) : (
        <DocumentContainer>
          {documentData.documents.map((document) => (
            <DocumentItem key={document.id} role={role} document={document} />
          ))}
        </DocumentContainer>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={documentData.totalPageCount}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mt-10"
      />
      <UploadModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

const DocumentContainer = ({ children }: PropsWithChildren) => {
  return <ul className="mt-4 w-full">{children}</ul>;
};
