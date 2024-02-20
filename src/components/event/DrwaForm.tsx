import { useState, ChangeEvent } from 'react';
import UploadCertificate from './UploadCertificate';
import UploadImage from '../common/UploadImage';
type Props = {
  closeModal: () => void;
};
export default function DrawForm({ closeModal }: Props) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [image, SetImage] = useState<File | null>(null);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(event.target.value);
  }
  return (
    <div className="flex w-full flex-col justify-center ">
      <div className="flex mb-3 w-full flex-col items-start ">
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
      <div className="flex mb-3 w-full flex-col items-center">
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
      <div className="flex mt-2 flex-row justify-center">
        <button
          type="button"
          onClick={closeModal}
          className=" cursor-pointer rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-bold text-gray-500  transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
        >
          취소
        </button>
        <button
          //   onClick={handleSubmit}
          type="submit"
          className="ml-2 cursor-pointer rounded-lg bg-pink-400 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-pink-200 md:w-auto md:py-2.5 "
        >
          응모하기
        </button>
      </div>
    </div>
  );
}
