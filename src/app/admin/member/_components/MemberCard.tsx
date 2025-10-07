'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { Body3, Card } from 'ddingdong-design-system';

import { Member } from '@/app/_api/types/member';
import { useDebounce } from '@/hooks/common/useDebounce';

import MemberInfo from './MemberInfo';
import { SearchBar } from './Searchbar';

type MemberCardProps = {
  memberInfo: Member[];
};

export function MemberCard({ memberInfo }: MemberCardProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const filteredMemberInfo = useMemo(
    () =>
      memberInfo.filter(
        (m) =>
          m.name.includes(debouncedSearch) ||
          m.studentNumber.includes(debouncedSearch),
      ),
    [debouncedSearch, memberInfo],
  );

  return (
    <Card className="hover:bg-transparent">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClickReset={() => setSearch('')}
      />
      <Body3 weight="semibold" className="mt-8 p-2 text-gray-500">
        <Body3 as="span" className="text-blue-500">
          {filteredMemberInfo.length}명
        </Body3>
        의 동아리원이 검색돼요.
      </Body3>
      <MemberInfoContainer>
        {filteredMemberInfo.map((member) => (
          <MemberInfo key={member.id} member={member} />
        ))}
      </MemberInfoContainer>
    </Card>
  );
}

function MemberInfoContainer({ children }: PropsWithChildren) {
  return (
    <ul className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
