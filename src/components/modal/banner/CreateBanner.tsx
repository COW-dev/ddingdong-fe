import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ImageInput from '@/assets/imageInput.svg';
import ColorSelect from '@/components/common/ColorSelect';
import UploadImage from '@/components/common/UploadImage';
import { BannerColor } from '@/constants/color';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';
import { NewBannerType } from '@/types/banner';
const init = {
  title: '',
  subTitle: '',
  colorCode: BannerColor[0].title,
};
type Prop = {
  closeModal: () => void;
};
export default function CreateBanner({ closeModal }: Prop) {
  const mutation = useNewBanner();
  const formData = new FormData();
  const [cookies] = useCookies(['token']);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [bannerData, setBannerData] = useState<NewBannerType>(init);

  function handleSubmit() {
    //
    handleReset();
    closeModal();
  }

  function handleChangeWebBanner() {
    //
  }
  function handleReset() {
    setBannerData(init);
  }
  return (
    <>
      <form className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-500">
          * 웹 배너 규격(px) : 1032X200 / 모바일 배너 규격(px) : 342X225
        </span>
        <label className="font-semibold text-gray-500">
          ‘웹 배너’ 파일을 업로드 해주세요.
          <UploadImage className="p-0 py-2" />
        </label>
        <label className="font-semibold text-gray-500">
          ‘모바일 배너’ 파일을 업로드 해주세요.
          <UploadImage className="p-0 py-2" />
        </label>

        <div className="mt-6 flex h-12 items-center justify-center md:mt-8">
          <button
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200 md:text-base"
            onClick={closeModal}
          >
            취소
          </button>

          <button
            type="submit"
            className={`text-md ml-5 rounded-lg bg-blue-500 px-16 py-2.5 font-bold text-white transition-colors hover:bg-blue-600 md:w-auto    
          `}
          >
            업로드하기
          </button>
        </div>
      </form>
    </>
  );
}
