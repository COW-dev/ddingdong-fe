import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import ExcelDropdown from '@/components/common/ExelDropdown';
import SearchBar from '@/components/home/SearchBar';
import MemberInfo from '@/components/member/MemberInfo';

import { useMyClub } from '@/hooks/api/club/useMyClub';
import { Member } from '@/types/club';

export default function Index() {
  const [keyword, setKeyword] = useState<string>('');
  const [{ token }] = useCookies(['token']);

  const {
    data: { data },
  } = useMyClub(token);

  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMembers(data?.clubMembers ?? []);
    setFilteredMembers(data?.clubMembers ?? []);
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredMembers(
        members.filter(
          (member) =>
            member.name.includes(keyword) ||
            member.studentNumber.includes(keyword) ||
            member.department.includes(keyword) ||
            member.phoneNumber.includes(keyword) ||
            member.position.includes(keyword),
        ),
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [members, keyword]);

  return (
    <div className="md:p-5">
      <div className="mb-14 mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        동아리원 명단 관리
      </div>
      <div className="mb-7 flex justify-between">
        <div className="font-bold md:text-xl">
          {data?.name}의 동아리원은 총
          <span className="text-blue-500"> {members.length}명</span>
          입니다.
        </div>
        <ExcelDropdown />
      </div>

      <div className="rounded-xl border-[1.5px] border-gray-100 p-5  ">
        <SearchBar value={keyword} onChange={setKeyword} />
        <div className="mb-3 mt-5 text-sm font-semibold text-gray-500 md:text-base">
          <span className="text-blue-500 opacity-70">
            {filteredMembers.length}명
          </span>
          의 동아리원이 검색돼요.
        </div>

        <ul className="grid w-full grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
          {filteredMembers.map((info) => (
            <MemberInfo member={info} key={info.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
