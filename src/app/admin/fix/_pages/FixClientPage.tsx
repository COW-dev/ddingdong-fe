'use client';
import Link from 'next/link';

import { Body3, Button, Flex, Title1 } from 'ddingdong-design-system';

import { fixQueryOptions } from '@/app/_api/queries/fix';
import { RoleType } from '@/constants/role';

import { FixItemList } from '../_component/FixItemList';

export default function FixClientPage({ role }: { role: keyof RoleType }) {
  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Title1 as="h1" weight="bold" className="py-7 md:py-10">
          동아리방 시설보수 확인
        </Title1>
        {role === 'ROLE_CLUB' && (
          <Link href="/fix/new">
            <Button size="md" variant="secondary" color="blue">
              <Body3 weight="bold">신청하기</Body3>
            </Button>
          </Link>
        )}
      </Flex>
      <FixItemList
        queryOptions={
          role === 'ROLE_CLUB' ? fixQueryOptions.my() : fixQueryOptions.all()
        }
      />
    </>
  );
}
