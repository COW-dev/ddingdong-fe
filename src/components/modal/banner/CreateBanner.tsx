import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadImage from '@/components/common/UploadImage';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { UploadFile } from '@/types';
import { NewBanner } from '@/types/banner';

const init: NewBanner = {
  mobileImageId: '',
  webImageId: '',
  link: '',
};

type Prop = {
  closeModal: () => void;
};
export default function CreateBanner({ closeModal }: Prop) {
  const mutation = useNewBanner();
  const [{ token }] = useCookies(['token']);
  const [banner, setBanner] = useState<NewBanner>(init);
  const { getPresignedId, isLoading: isBannerLoading } = usePresignedUrl();

  function handleChangeBannerImage(key: 'webImageId' | 'mobileImageId') {
    return async function (file: File): Promise<UploadFile> {
      const bannerInfo = await getPresignedId(file);
      if (bannerInfo?.id) {
        setBanner((prev) => ({
          ...prev,
          [key]: bannerInfo.id,
        }));
        return bannerInfo;
      }
      throw new Error('이미지 생성에 문제가 생겼습니다.');
    };
  }

  const handleChangeWebBanner = handleChangeBannerImage('webImageId');
  const handleChangeMobileBanner = handleChangeBannerImage('mobileImageId');

  function handleChangeLink(event: ChangeEvent<HTMLInputElement>) {
    setBanner((prev) => ({
      ...prev,
      link: event.target.value,
    }));
  }

  function handleReset() {
    setBanner(init);
  }

  function handleSubmit() {
    mutation.mutate({ token, ...banner });
    handleReset();
    closeModal();
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <span className="text-xs font-medium text-gray-500">
        * 웹 배너 규격(px) : 1032X200 / 모바일 배너 규격(px) : 342X225
      </span>
      <label className="font-semibold text-gray-500">
        ‘웹 배너’ 파일을 업로드 해주세요.
        <UploadImage className="p-0 py-2" onAdd={handleChangeWebBanner} />
      </label>
      <label className="font-semibold text-gray-500">
        ‘모바일 배너’ 파일을 업로드 해주세요.
        <UploadImage className="p-0 py-2" onAdd={handleChangeMobileBanner} />
      </label>

      <label className="font-semibold text-gray-500">
        링크
        <input
          name="link"
          type="text"
          spellCheck={false}
          className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
          value={banner.link}
          onChange={(e) => handleChangeLink(e)}
        />
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
          className={`text-md ml-5 rounded-lg bg-blue-500 px-16 py-2.5 font-bold text-white transition-colors hover:bg-blue-600 md:w-auto ${
            isBannerLoading && 'cursor-not-allowed bg-gray-500'
          }`}
          disabled={isBannerLoading}
        >
          업로드하기
        </button>
      </div>
    </form>
  );
}
