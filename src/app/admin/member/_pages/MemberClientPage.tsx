'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Button,
  Flex,
  IconButton,
  Title1,
  Title3,
  usePortal,
} from 'ddingdong-design-system';

import { memberQueryOptions } from '@/app/_api/queries/member';

import { AddModal } from '../_components/AddModal';
import { ExcelDropdown } from '../_components/ExcelDropdown';
import { MemberCard } from '../_components/MemberCard';

export function MemberClientPage() {
  const { data: memberInfo } = useSuspenseQuery(memberQueryOptions.all());
  const { isOpen, openModal, closeModal } = usePortal();

  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        동아리원 명단 관리
      </Title1>
      <Flex justifyContent="between" alignItems="center" className="pt-3 pb-5">
        <Title3 weight="bold" className="py-5">
          {memberInfo?.clubName?.toUpperCase()}의 동아리원은 총{' '}
          <Title3 as="span" weight="bold" className="text-blue-500">
            {memberInfo?.clubMembers.length}명
          </Title3>
          입니다.
        </Title3>
        <Flex gap={2} alignItems="center">
          <MemberAddButton openModal={openModal} />
          <ExcelDropdown />
        </Flex>
      </Flex>
      <MemberCard memberInfo={memberInfo.clubMembers} />
      <AddModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

function MemberAddButton({ openModal }: { openModal: VoidFunction }) {
  return (
    <>
      <Button
        variant="primary"
        color="blue"
        size="md"
        className="hidden sm:block"
        onClick={openModal}
      >
        명단 추가하기
      </Button>
      <IconButton
        iconName="write"
        color="primary"
        size={20}
        onClick={openModal}
        className="block sm:hidden"
      />
    </>
  );
}
