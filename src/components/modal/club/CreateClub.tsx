import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { CatogoryColor } from '@/constants/color';
import { useNewClub } from '@/hooks/api/club/useNewClub';
import Select from '@/hooks/common/Select';
import { MODAL_TYPE, ModalProp } from '..';
const init = {
  clubName: '',
  category: '',
  tag: '',
  leaderName: '',
  userId: '',
  password: '',
};
export default function CreateClub({ setModal }: ModalProp) {
  const mutation = useNewClub();
  const [cookies] = useCookies(['token']);
  const [clubData, setClubData] = useState(init);
  const { clubName, tag, leaderName, userId, password } = clubData;

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
    setClubData(init);
  }

  useEffect(() => {
    if (clubData) setClubData(clubData);
  }, [clubData]);

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

        <div className="mr-3  flex flex-row">
          <div className="mb-2 w-full ">
            <label className="inline-block w-20  font-semibold text-gray-500">
              카테고리
            </label>
            <Select
              name={'category'}
              setData={setClubData}
              list={CatogoryColor}
            />
          </div>
          <div className="mb-2 ml-3 w-full">
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
