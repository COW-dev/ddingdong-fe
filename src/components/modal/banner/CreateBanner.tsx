import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ImageInput from '@/assets/imageInput.svg';
import { BannerColor } from '@/constants/color';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';
import Select from '@/hooks/common/useSelect';
import { NewBannerType } from '@/types/banner';
import { isMissingData } from '@/utils/validator';
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
  const [image, setImage] = useState<File | null>(null);
  const [bannerData, setBannerData] = useState<NewBannerType>(init);
  const { title, subTitle, colorCode } = bannerData;
  useEffect(() => {
    if (bannerData) setBannerData(bannerData);
  }, [bannerData]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setBannerData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('colorCode', colorCode);
    image && formData.append('uploadFiles', image);
    mutation.mutate({
      formData: formData,
      token: cookies.token,
    });
    handleReset();
    closeModal();
  }

  function uploadImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  }

  function handleReset() {
    setBannerData(init);
  }
  return (
    <>
      <form className="w-full">
        <div className="mb-3 w-full">
          <label className="inline-block w-20 font-semibold text-gray-500">
            제목
          </label>
          <input
            name="title"
            type="text"
            spellCheck={false}
            value={title}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 w-full">
          <label className="inline-block w-20 font-semibold text-gray-500">
            부제목
          </label>
          <input
            name="subTitle"
            type="text"
            spellCheck={false}
            value={subTitle}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
          />
        </div>

        <div className="mr-3 flex  flex-row">
          <div className=" mb-2 w-full ">
            <label className="inline-block w-20 font-semibold text-gray-500">
              배경색
            </label>
            <div className="w-full rounded-xl border border-gray-100 bg-gray-50 outline-none   ">
              <Select
                name={'colorCode'}
                setData={setBannerData}
                list={BannerColor}
              />
            </div>
          </div>

          <div className="mb-3 ml-2 w-full">
            <label className="font-semibold text-gray-500">
              이미지
              <div className="flex w-[100%] flex-col items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5">
                <div className="flex">
                  <Image
                    src={ImageInput}
                    width={25}
                    height={25}
                    alt="사진 선택"
                  />
                  {image && image.name}
                </div>
              </div>
              <input
                name="imgUrl"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadImg}
              />
            </label>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isMissingData({ ...bannerData, image })}
          className={`mt-5 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg ${
            isMissingData({ ...bannerData, image }) &&
            `cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200`
          }`}
        >
          배너 생성하기
        </button>
      </form>
    </>
  );
}
