import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNewClub } from '@/hooks/api/club/useNewClub';
import { MODAL_TYPE, ModalProp } from '..';

export default function CreateClub({ setModal }: ModalProp) {
  const mutation = useNewClub();
  const [cookies] = useCookies(['token']);
  const [clubData, setClubData] = useState({
    clubName: '',
    category: '',
    tag: '',
    leaderName: '',
    userId: 0,
    password: '',
  });
  const { clubName, category, tag, leaderName, userId, password } = clubData;

  useEffect(() => {
    if (clubData) setClubData(clubData);
  }, [clubData]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setClubData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ ...clubData, token: cookies.token });
    handleReset();
    setModal(MODAL_TYPE.null);
  }

  function handleReset() {
    setClubData({
      clubName: '',
      category: '',
      tag: '',
      leaderName: '',
      userId: 0,
      password: '',
    });
  }

  return (
    <>
      <form className=" w-full" onSubmit={handleSubmit}>
        <div className="mb-3 w-full">
          <label className="inline-block w-20 font-semibold text-gray-500">
            동아리명
          </label>
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-2 w-full ">
          <label className="inline-block w-20 font-semibold text-gray-500">
            대표자
          </label>
          <input
            name="leaderName"
            type="text"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            value={leaderName}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="flex flex-row">
          <div className="mb-2 w-full ">
            <label className="inline-block w-20 font-semibold text-gray-500">
              카테고리
            </label>
            <input
              name="category"
              type="text"
              spellCheck={false}
              className="w-[90%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
              value={category}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-2 w-full">
            <label className="inline-block w-20 font-semibold text-gray-500">
              태그
            </label>
            <input
              name="tag"
              type="text"
              spellCheck={false}
              className="w-[100%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
              value={tag}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="mb-2 w-full ">
          <label className="inline-block w-20 font-semibold text-gray-500">
            아이디
          </label>
          <input
            name="userId"
            type="text"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            value={userId}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-2 w-full ">
          <label className="inline-block w-20 font-semibold text-gray-500">
            비밀번호
          </label>
          <input
            name="password"
            type="password"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
        >
          동아리 생성하기
        </button>
      </form>
    </>
  );
}
