'use client';

import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Body1, Pagination, Title1 } from 'ddingdong-design-system';

import { documentQueryOptions } from '@/app/_api/queries/document';

import DocumentContainer from '../_containers/DocumentContainer';

import { DocumentItem } from './DocumentItem';

export function DocumentClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: documents } = useSuspenseQuery(documentQueryOptions.all());

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        자료실
      </Title1>
      <DocumentContainer>
        {documents.documents.length === 0 ? (
          <Body1 className="text-gray-400">자료가 없습니다.</Body1>
        ) : (
          documents.documents.map((document) => (
            <DocumentItem key={document.id} document={document} />
          ))
        )}
      </DocumentContainer>
      {/* TODO : currentPage 버그, 1->2 페이지 전환 시 scrollTo 적용 */}
      {documents.documents.length > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={documents.totalPageCount}
          onPageChange={() => setCurrentPage((prev) => prev + 1)}
          className="mt-10"
        />
      )}
    </>
  );
}
