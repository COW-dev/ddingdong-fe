import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body2,
  Button,
  DoubleButton,
  Flex,
  Icon,
  Modal,
  Title3,
} from 'ddingdong-design-system';

import { documentQueryOptions } from '@/app/_api/queries/document';

import { downloadAll, downloadFile } from '../_utils/downloadFile';

type DocumentModalProps = {
  id: number;
  isOpen: boolean;
  closeModal: VoidFunction;
};

export function DocumentModal({ id, isOpen, closeModal }: DocumentModalProps) {
  const { data: document } = useSuspenseQuery(documentQueryOptions.detail(id));

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[380px]">
        <Title3>자료실 다운로드</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Flex dir="col" gap={2} className="py-2">
          {document.files.map((item) => (
            <Flex
              key={item.id}
              alignItems="center"
              justifyContent="between"
              onClick={() => downloadFile(item.originUrl, item.name)}
              className="cursor-pointer"
            >
              <Body2 weight="medium">{item.name}</Body2>
              <Icon name="download" color="black" size={16} />
            </Flex>
          ))}
        </Flex>

        <DoubleButton
          left={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={() => downloadAll(document.files)}
            >
              <Body2 weight="semibold">모두 다운로드</Body2>
            </Button>
          }
          right={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2>닫기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
