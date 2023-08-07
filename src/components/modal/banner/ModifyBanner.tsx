import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import ImageInput from '@/assets/imageInput.svg';
import { BannerColor } from '@/constants/color';
import Select from '@/hooks/common/useSelect';
import { BannerType, NewBannerType } from '@/types/banner';
import { isMissingData } from '@/utils/validator';

type Props = {
  data: BannerType;
  closeModal: () => void;
};
export default function ModifyBanner({ data, closeModal }: Props) {
  const { title, subTitle, colorCode, imgUrl } = data;
  const [image, setImage] = useState<File | string>(imgUrl);
  // const updateMutation = useUpdateClub();

  const [changedBanner, setBanner] = useState<NewBannerType>({
    title,
    subTitle,
    colorCode,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setBanner((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function uploadImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  }

  function moveItemToFrontByColor(color: string) {
    const index = BannerColor.findIndex((item) => item.title === color);
    if (index !== -1 && index !== 0) {
      const item = BannerColor.splice(index, 1)[0];
      BannerColor.splice(0, 0, item);
    }
    return BannerColor;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // updateMutation.mutate({ id, token: cookies.token });
    closeModal();
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
            value={changedBanner.title}
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
            value={changedBanner.subTitle}
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
                setData={setBanner}
                list={moveItemToFrontByColor(colorCode)}
              />
            </div>
          </div>

          <div className="mb-3 ml-2 w-full">
            <label className="font-semibold text-gray-500">
              이미지
              <div className="flex w-[100%] flex-col items-center rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5">
                <Image
                  src={ImageInput}
                  width={25}
                  height={25}
                  alt="bannerImage"
                />
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
          onClick={() => handleSubmit}
          disabled={isMissingData({ ...changedBanner, image })}
          className={`mt-5 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg ${
            isMissingData({ ...changedBanner, image }) &&
            `cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-200`
          }`}
        >
          배너 수정하기
        </button>
      </form>
    </>
  );
}
