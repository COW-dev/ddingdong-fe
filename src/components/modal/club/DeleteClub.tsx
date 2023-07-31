import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDeleteClub } from '@/hooks/api/club/useDeleteClub';

type Prop = {
  id: number;
  name: string;
  closeModal: () => void;
};
export default function DeleteClub({ id, name, closeModal }: Prop) {
  const deleteMutation = useDeleteClub();
  const [cookies] = useCookies(['token']);
  const [value, setValue] = useState('');

  function handleClickDelete() {
    deleteMutation.mutate({
      clubId: id,
      token: cookies.token,
    });
    setValue('');
    closeModal();
  }

  useEffect(() => {
    setValue('');
  }, []);

  return (
    <>
      <form
        className="m-auto flex w-[90%] flex-col"
        onSubmit={handleClickDelete}
      >
        <div className="mb-3 w-full">
          <label className="inline-block font-semibold text-gray-500">
            삭제를 위해 동아리명을 입력해주세요.
          </label>
          <input
            name="score"
            type="text"
            value={value}
            placeholder={name}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={value !== name}
          onClick={handleClickDelete}
          className={`mt-10 w-full rounded-xl py-4 font-bold sm:py-4 sm:text-lg md:mt-14 ${
            value === name
              ? 'bg-red-600 text-white'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'
          }`}
        >
          동아리 삭제하기
        </button>
      </form>
    </>
  );
}
