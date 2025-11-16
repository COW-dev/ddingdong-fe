'use client';

import { useEffect, useState } from 'react';

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

type EditSectionModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onUpdateSection: (newName: string) => void;
  currentName: string;
  existingSections: string[];
};

export function EditSectionModal({
  isOpen,
  onClose,
  onUpdateSection,
  currentName,
  existingSections,
}: EditSectionModalProps) {
  const [sectionName, setSectionName] = useState(currentName);

  useEffect(() => {
    if (isOpen) {
      setSectionName(currentName);
    }
  }, [isOpen, currentName]);

  const handleUpdate = () => {
    const trimmedName = sectionName.trim();

    if (!trimmedName) {
      toast.error('섹션 이름을 입력해주세요.');
      return;
    }

    if (trimmedName === currentName) {
      onClose();
      return;
    }

    if (existingSections.includes(trimmedName)) {
      toast.error('이미 존재하는 섹션 이름입니다.');
      return;
    }

    onUpdateSection(trimmedName);
    setSectionName('');
    onClose();
  };

  const handleClose = () => {
    setSectionName(currentName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>섹션 이름 변경</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Input
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          onClickReset={() => setSectionName('')}
          placeholder="섹션 이름을 입력해주세요."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdate();
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
              onClick={handleUpdate}
              disabled={!sectionName.trim()}
            >
              <Body2 weight="semibold">변경하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
