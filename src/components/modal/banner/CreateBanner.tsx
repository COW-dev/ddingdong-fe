import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadImage from '@/components/common/UploadImage';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';

import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { SubmitBanner } from '@/types/banner';

type Prop = {
  closeModal: () => void;
};

const init: SubmitBanner = {
  webImageKey: '',
  mobileImageKey: '',
};

export default function CreateBanner({ closeModal }: Prop) {
  const mutation = useNewBanner();
  const [{ token }] = useCookies(['token']);
  const [webImage, setWebImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [bannerData, setBannerData] = useState<SubmitBanner>(init);

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ bannerData, token });
    closeModal();
  }

  function handleReset() {
    setBannerData(init);
  }
  const { getKey } = usePresignedUrl(`banner`);

  const handleChangeImage = async (
    file: File,
    urlName: 'webImageKey' | 'mobileImageKey',
  ) => {
    const key = await getKey(file);
    setBannerData((prev) => ({
      ...prev,
      [urlName]: key,
    }));
  };

  useEffect(() => {
    if (!webImage) return;
    handleChangeImage(webImage, 'webImageKey');
  }, [webImage]);

  useEffect(() => {
    if (!mobileImage) return;
    handleChangeImage(mobileImage, 'mobileImageKey');
  }, [mobileImage]);

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <UploadImage image={webImage} setImage={setWebImage} />
        <UploadImage image={mobileImage} setImage={setMobileImage} />
        <button type="submit">배너 생성하기</button>
      </form>
    </>
  );
}
