import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ImageInput from '@/assets/imageInput.svg';
import { BannerColor } from '@/constants/color';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';
import Select from '@/hooks/common/Select';
import { BannerType } from '@/types';
import { MODAL_TYPE, ModalProp } from '..';

export default function CreateBanner({ data, setModal }: ModalProp) {
  const mutation = useNewBanner();
  const formData = new FormData();
  const [cookies] = useCookies(['token']);
  const [temp, setTemp] = useState<any>(null);
  const [bannerData, setBannerData] = useState<BannerType>({
    title: '',
    subTitle: '',
    colorCode: BannerColor[1].color,
    imgUrl: '',
  });
  const { title, subTitle, colorCode, imgUrl } = bannerData;

  useEffect(() => {
    if (bannerData) setBannerData(bannerData);
  }, [bannerData]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setBannerData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleFormData() {
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('colorCode', colorCode);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBannerData(bannerData);
    handleFormData();
    formData.append('uploadFiles', temp);
    console.log(formData.get('uploadFiles'));
    mutation.mutate({
      formData: formData,
      token: cookies.token,
    });

    handleReset();
    setModal(MODAL_TYPE.null);
  }

  function uploadImg(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setTemp(file);
    }
  }

  function handleReset() {
    setBannerData({
      title: '',
      subTitle: '',
      colorCode: BannerColor[1].color,
      imgUrl: '',
    });
  }

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
                <Image
                  src={ImageInput}
                  width={25}
                  height={25}
                  alt="사진 선택"
                />
              </div>
              <input
                name="imgUrl"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImg(e)}
              />
              <div>{imgUrl}</div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
        >
          배너 생성하기
        </button>
      </form>
    </>
  );
}
