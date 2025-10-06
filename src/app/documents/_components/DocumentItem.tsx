'use client';

import { Body1, Body3, Flex, Icon } from 'ddingdong-design-system';

import { Document } from '@/app/_api/types/document';
import useModal from '@/hooks/common/useModal';

import { DocumentModal } from './DocumentModal';

export function DocumentItem({ document }: { document: Document }) {
  const { visible, openModal, closeModal } = useModal();

  return (
    <>
      <Flex
        as="li"
        justifyContent="between"
        onClick={openModal}
        className="cursor-pointer border-b border-gray-200 p-3.5 hover:bg-gray-50 md:p-5"
      >
        <Flex dir="col" gap={1}>
          <Body1>{document.title}</Body1>
          <Body3 weight="medium" className="text-gray-300">
            {new Date(document.createdAt).toLocaleDateString('ko-KR')}
          </Body3>
        </Flex>
        <Flex dir="row" alignItems="center" gap={1}>
          <Icon name="download" color="black" size={24} />
        </Flex>
      </Flex>
      <DocumentModal
        id={document.id}
        isOpen={visible}
        closeModal={closeModal}
      />
    </>
  );
}
