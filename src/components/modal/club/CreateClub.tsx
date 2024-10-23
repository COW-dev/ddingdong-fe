import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import ColorSelect from '@/components/common/ColorSelect';
import { CatogoryColor } from '@/constants/color';
import { useNewClub } from '@/hooks/api/club/useNewClub';
import { NewClub } from '@/types/club';
import { isMissingData, validator } from '@/utils/validator';

const init = {
  clubName: '',
  category: CatogoryColor[0].title,
  tag: '',
  leaderName: '',
  authId: '',
  password: '',
};

type CreateClubProp = {
  closeModal: () => void;
};

export default function CreateClub({ closeModal }: CreateClubProp) {
  const mutation = useNewClub();
  const [cookies] = useCookies(['token']);
  const [clubData, setClubData] = useState<NewClub>(init);
  const { clubName, tag, leaderName, authId, password } = clubData;

  function handlePasswordValidate(object: { type: string; value: string }) {
    if (object.value && !validator(object)) {
      toast.error('형식에 맞춰 재입력해주세요.');
      setClubData((prev) => ({
        ...prev,
        [object.type]: '',
      }));
    }
  }

  function handleValidate(clubData: { [x: string]: string }) {
    return (
      isMissingData(clubData) ||
      !validator({ type: 'password', value: password })
    );
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setClubData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    mutation.mutate({ ...clubData, token: cookies.token });
    handleReset();
    closeModal();
  }

  function handleReset() {
    setClubData(init);
  }

  useEffect(() => {
    if (clubData) setClubData(clubData);
  }, [clubData]);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
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
            <ColorSelect
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
            name="authId"
            type="text"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            value={authId}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          className="mb-2 w-full "
          onBlur={() =>
            handlePasswordValidate({ type: 'password', value: password })
          }
        >
          <label className="inline-block w-20 font-semibold text-gray-500">
            비밀번호
          </label>
          <input
            name="password"
            type="password"
            placeholder="영어/숫자 조합 8자리 이상"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          disabled={handleValidate(clubData)}
          className={` w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors  hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg ${
            handleValidate(clubData) &&
            `cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200`
          }`}
        >
          동아리 생성하기
        </button>
      </form>
    </>
  );
}
