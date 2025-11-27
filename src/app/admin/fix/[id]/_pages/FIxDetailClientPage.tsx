'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title1 } from 'ddingdong-design-system';

import { fixQueryOptions } from '@/app/_api/queries/fix';
import { RoleType } from '@/constants/role';

import { BackHeader } from '../../_component/BackHeader';
import { ResolveButton } from '../_components/ResolveButton';
import { FixPost } from '../_components/FixPost';
import { RoleType } from '@/constants/role';
import { FixComment } from '../_components/FixComment';

export default function FIxDetailClientPage({
  id,
  role,
}: {
  id: number;
  role: keyof RoleType;
}) {
  const { data: post } = useSuspenseQuery(fixQueryOptions.detail(id));

  return (
    <>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        동아리방 시설보수 확인
      </Title1>
      <BackHeader title={post.title} />
      <Flex dir="col" gap={10} className="py-4">
        <FixPost post={post} />
        {role === 'ROLE_ADMIN' && <ResolveButton post={post} />}
        <FixComment comments={post.comments} id={id} role={role} />
      </Flex>
    </>
  );
}
