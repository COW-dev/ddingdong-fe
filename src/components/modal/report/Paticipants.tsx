import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNewClub } from '@/hooks/api/club/useNewClub';
import { MODAL_TYPE, ModalProp } from '..';

export default function Participants({ data, setModal }: ModalProp) {
  const mutation = useNewClub();
  const [cookies] = useCookies(['token']);
  const [clubData, setClubData] = useState({
    clubName: '',
    category: '',
    tag: '',
    leaderName: '',
    userId: '',
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
    // mutation.mutate({ ...clubData, token: cookies.token });
    handleReset();
    setModal(MODAL_TYPE.null);
  }

  function handleReset() {
    setClubData({
      clubName: '',
      category: '',
      tag: '',
      leaderName: '',
      userId: '',
      password: '',
    });
  }

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3  rounded-xl text-gray-500">
          <label className="inline-block px-4 pb-2 font-semibold">이름</label>
          <label className="inline-block px-4 pb-2 font-semibold">학번</label>
          <label className="inline-block px-4 pb-2 font-semibold">학과</label>
        </div>
        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 flex overflow-hidden rounded-xl bg-gray-50 py-2.5 text-gray-500 ">
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="clubName"
            type="text"
            spellCheck={false}
            value={clubName}
            className="w-full border-l-2 bg-gray-50 px-4 outline-none"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
        >
          등록하기
        </button>
      </form>
    </>
  );
}
