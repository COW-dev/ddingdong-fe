import Link from 'next/link';

import { Button, IconButton } from 'ddingdong-design-system';

import { ROLE_TYPE, RoleType } from '@/constants/role';

export function NewActionButton({ role }: { role: keyof RoleType }) {
  return (
    <Link
      href="/notice/new"
      className={role === ROLE_TYPE.ROLE_CLUB ? 'invisible' : ''}
    >
      <IconButton
        iconName="write"
        color="primary"
        size={22}
        className="inline-block sm:hidden"
      />
      <Button variant="primary" color="blue" className="hidden sm:inline-block">
        공지사항 작성하기
      </Button>
    </Link>
  );
}
