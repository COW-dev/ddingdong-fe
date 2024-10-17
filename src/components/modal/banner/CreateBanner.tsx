import { useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadImage from '@/components/common/UploadImage';
import { useNewBanner } from '@/hooks/api/banner/useNewBanner';

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
