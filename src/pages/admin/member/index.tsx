import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SearchBar from '@/components/home/SearchBar';
import MemberInfo from '@/components/member/MemberInfo';
import { Position } from '@/constants/text';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useUpdateMembers } from '@/hooks/api/member/useMembers';
import { Member } from '@/types/club';

export default function Index() {
  const [keyword, setKeyword] = useState<string>('');
  const [{ token }] = useCookies(['token']);
  const {
    data: { data },
  } = useMyClub(token);
  const mutation = useUpdateMembers();

  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditting() {
    setIsEditing(!isEditing);
  }
  function handleSubmit() {
    const parsedMember = parsePosition();
    mutation.mutate({ members: parsedMember, token });

    setIsEditing(!isEditing);
  }
  function parsePosition() {
    const parsedMember: Member[] = [];
    members.map((member) => {
      parsedMember.push({
        ...member,
        position: Position[member.position],
      });
    });
    return parsedMember;
  }
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
    <div className="p-5">
      <div className="mb-14 mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        동아리원 관리하기
      </div>
      <div className="mb-7 flex justify-between">
        <div className="font-bold md:text-xl ">
          {data.name}의 동아리원은 총
          <span className="text-blue-500">{members.length}명</span>
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
            onClick={isEditing ? handleSubmit : handleEditting}
            className="rounded-lg  bg-blue-100 px-4 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5"
          >
            {isEditing ? `변경사항 저장` : `명단 수정하기`}
          </button>
        </div>
      </div>
      <div className=" rounded-xl border-[1.5px] border-gray-100 p-5  ">
        <SearchBar value={keyword} onChange={setKeyword} />
        <div className="mb-3 mt-14 text-sm font-semibold text-gray-500 md:text-base">
          <span className="text-blue-500 opacity-70">
            {filteredMembers.length}명
          </span>
          의 동아리원이 검색돼요.
        </div>
        <ul className="grid w-full grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
          {isEditing && (
            <MemberInfo
              isEditing={isEditing}
              setMembers={setMembers}
              members={members}
              member={{
                id: 0,
                name: '',
                department: '',
                position: '동아리원',
                phoneNumber: '',
                studentNumber: '',
              }}
            />
          )}
          {filteredMembers.map((info) => (
            <div key={info.id}>
              <MemberInfo
                isEditing={isEditing}
                setMembers={setMembers}
                members={members}
                member={info}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
