'use client';

import { useState } from 'react';

import {
  Body2,
  Button,
  DoubleButton,
  Flex,
  Input,
  Modal,
  Title3,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

type AddSectionModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onAddSection: (sectionName: string) => void;
  existingSections: string[];
};

export function AddSectionModal({
  isOpen,
  onClose,
  onAddSection,
  existingSections,
}: AddSectionModalProps) {
  const [sectionName, setSectionName] = useState('');

  const handleAdd = () => {
    const trimmedName = sectionName.trim();

    if (!trimmedName) {
      toast.error('섹션 이름을 입력해주세요.');
      return;
    }

    if (existingSections.includes(trimmedName)) {
      toast.error('이미 존재하는 섹션 이름입니다.');
      return;
    }

    onAddSection(trimmedName);
    setSectionName('');
    onClose();
  };

  const handleClose = () => {
    setSectionName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[450px]">
        <Title3>섹션 추가</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Input
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          onClickReset={() => setSectionName('')}
          placeholder="섹션 이름을 입력해주세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={handleClose}>
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={handleAdd}
              disabled={!sectionName.trim()}
            >
              <Body2 weight="semibold">추가하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
