'use client';

import Link from 'next/link';

import { Dispatch, SetStateAction, useState } from 'react';

import {
  Body2,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Modal,
  Title3,
} from 'ddingdong-design-system';

import ParticipantSelect from '@/app/admin/report/[term]/new/_components/ParticipantSelect';
import { StudentInfo } from '@/types';
import { EditReport } from '@/types/report';

export const EMPTY_PARTICIPANT: StudentInfo = {
  name: '',
  studentId: '',
  department: '',
};

type Props = {
  data: StudentInfo[];
  setData: Dispatch<SetStateAction<EditReport>>;
  closeModal: () => void;
  isOpen: boolean;
};

export default function ParticipantModal({
  isOpen,
  data,
  setData,
  closeModal,
}: Props) {
  const [participants, setParticipants] = useState<StudentInfo[]>(
    data.length > 0 ? data : Array(5).fill({ ...EMPTY_PARTICIPANT }),
  );

  const handleSubmit = () => {
    setData((prev) => ({ ...prev, participants }));
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex dir="col" className="gap-5">
        <Title3 weight="bold" className="text-gray-300">
          활동 명단 작성하기
        </Title3>

        <Flex as="ul" dir="col" className="gap-2">
          <Caption1 className="text-gray-500">이름</Caption1>
          {participants.map((participant, index) => (
            <ParticipantSelect
              key={index}
              name={participant.name}
              setData={setParticipants}
              id={index}
            />
          ))}
        </Flex>

        <Caption1 weight="normal" className="text-gray-300">
          명단이 보여지지 않는다면
          <Link href="/member" className="pl-1 text-blue-500">
            동아리원 수정
          </Link>
          을 진행해주세요
        </Caption1>

        <DoubleButton
          left={
            <Button variant="tertiary" size="md" onClick={closeModal}>
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              size="full"
              color="blue"
              onClick={handleSubmit}
            >
              <Body2>등록하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
