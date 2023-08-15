import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SearchBar from '@/components/home/SearchBar';
import MemberInfo from '@/components/member/MemberInfo';
import { useMembers } from '@/hooks/api/member/useMembers';
import { Member } from '@/types/member';

export default function Index() {
  const [keyword, setKeyword] = useState<string>('');
  const [{ token }] = useCookies(['token']);

  const { data: response } = useMembers(token);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditting() {
    setIsEditing(!isEditing);
  }

  useEffect(() => {
    setMembers(response?.data ?? []);
    setFilteredMembers(response?.data ?? []);
  }, [response]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredMembers(
        members.filter(
          (member) =>
            member.name.includes(keyword) ||
            member.studentId.includes(keyword) ||
            member.department.includes(keyword),
        ),
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [members, keyword]);

  return (
    <div className="p-5">
      <div className="mb-14 mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        동아리원 관리하기
      </div>
      <div className="mb-7 flex justify-between">
        <div className="font-bold md:text-xl ">
          COW의 동아리원은 총 <span className="text-blue-500">86명</span>
          입니다.
        </div>
        <div>
          {isEditing && (
            <button
              onClick={handleEditting}
              className="mr-2 rounded-lg  bg-gray-100 px-4 py-2 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-200 md:w-auto md:py-2.5"
            >
              취소
            </button>
          )}
          <button
            onClick={handleEditting}
            className="rounded-lg  bg-blue-100 px-4 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5"
          >
            {isEditing ? `변경사항 저장` : `명단 수정하기`}
          </button>
        </div>
      </div>
      <div className=" rounded-xl border-[1.5px] border-gray-100 p-5  ">
        <SearchBar value={keyword} onChange={setKeyword} />
        <div className="mb-3 mt-14 text-sm font-semibold text-gray-500 md:text-base">
          <span className="text-blue-500 opacity-70">38명</span>의 동아리원이
          검색돼요.
        </div>
        <ul className="grid w-full grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
          {isEditing && (
            <MemberInfo
              id={0}
              isEditing={isEditing}
              setMembers={setMembers}
              members={members}
              studentId={''}
              name={''}
              department={''}
            />
          )}
          {filteredMembers.map((info) => (
            <div key={info.id}>
              <MemberInfo
                id={info.id}
                isEditing={isEditing}
                setMembers={setMembers}
                members={members}
                studentId={info.studentId}
                name={info.name}
                department={info.department}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
