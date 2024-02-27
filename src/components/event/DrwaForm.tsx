import { useState, ChangeEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { isMissingData } from '@/utils/validator';
import UploadCertificate from './UploadCertificate';
type Props = {
  closeModal: () => void;
};
export default function DrawForm({ closeModal }: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [hydrated, setHydrated] = useState(false);
  const [image, SetImage] = useState<File | null>(null);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value);
  }
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isMissingData({image, phoneNumber}))
      return toast.error('전화번호와 납입증명서를 확인해주세요.');
    const user = localStorage.getItem('user');
    const parsedUser = user && JSON.parse(user);
    const formData = new FormData();
    image && formData.append('image', image);
    formData.append('phoneNumber', phoneNumber);
    formData.append('name', parsedUser.studentName);
    formData.append('number', parsedUser.studentNumber);
  }
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;
  return (
    <form
      className="flex w-full flex-col justify-center "
      onSubmit={handleSubmit}
    >
      <div className="mb-3 flex w-full flex-col items-start ">
        <label className="w-full font-semibold text-gray-500">
          <span className=" text-lg font-semibold text-gray-700">전화번호</span>
          <span className="ml-1 text-sm text-gray-400"> `-`제외하고 입력</span>
        </label>
        <input
          name="studentName"
          type="number"
          value={phoneNumber}
          className="mt-2 w-full rounded-xl bg-pink-50 px-4 py-2.5 outline-none"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="mb-3 flex w-full flex-col items-center">
        <label className=" w-full">
          <span className=" text-lg font-semibold text-gray-700">
            학생회비 납부내역 이미지 첨부
          </span>
          <span className="ml-1 text-sm text-gray-400">
            2024년도 1학기 기준
          </span>
        </label>
        <UploadCertificate image={image} setImage={SetImage} />
      </div>
      <div className=' text-[80%] text-center text-gray-500 my-2'>
        2024년도 1학기 기준 학생회비 미납부자는 응모가 불가합니다.
      </div>
      <div className="mt-2 flex flex-row justify-center">
        <button
          type="button"
          onClick={closeModal}
          className=" cursor-pointer rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-500  transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={!phoneNumber || !image}
          className={`ml-2 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-bold transition-colors md:w-auto md:py-2.5 
          ${(!phoneNumber || image === null) ? 'cursor-not-allowed bg-gray-100 hover:bg-gray-100 text-gray-500' : 'bg-pink-400 text-white hover:bg-pink-200'}`}
        >
          응모하기
        </button>
      </div>
    </form>
  );
}
