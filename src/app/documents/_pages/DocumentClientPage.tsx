'use client';

import { PropsWithChildren, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Body1, Pagination, Title1 } from 'ddingdong-design-system';

import { documentQueryOptions } from '@/app/_api/queries/document';

import { DocumentItem } from '../_components/DocumentItem';

export function DocumentClientPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: documents } = useSuspenseQuery(
    documentQueryOptions.all(currentPage),
  );

  return (
    <>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        자료실
      </Title1>
      {documents.documents.length === 0 ? (
        <Body1 className="text-gray-400">자료가 없습니다.</Body1>
      ) : (
        <DocumentContainer>
          {documents.documents.map((document) => (
            <DocumentItem key={document.id} document={document} />
          ))}
        </DocumentContainer>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={documents.totalPageCount}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mt-10"
      />
    </>
  );
}

function DocumentContainer({ children }: PropsWithChildren) {
  return <ul className="mt-4 w-full">{children}</ul>;
}
