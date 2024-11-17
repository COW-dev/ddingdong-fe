import Image from 'next/image';
import toast from 'react-hot-toast';
import Download from '@/assets/download.svg';

import { DocumentDetail } from '@/types/document';
import { downloadBlob } from '@/utils/file';

type Props = {
  documentData?: DocumentDetail;
};
export default function DocumentDownload({ documentData }: Props) {
  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      downloadBlob(blob, filename);
    } catch (error) {
      toast.error('파일 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleDownloadAll = async () => {
    if (!documentData?.files.length) return;

    const downloads = documentData.files.map((file, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          downloadFile(file.originUrl, file.name).then(resolve);
        }, index * 500);
      });
    });

    await Promise.all(downloads);
  };

  const handleSingleDownload = (url: string, filename: string) => {
    downloadFile(url, filename);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          className="flex cursor-pointer justify-between"
          onClick={handleDownloadAll}
        >
          <div className="font-semibold">모두 다운로드</div>
          <Image src={Download} width={17} height={17} alt="file" />
        </div>
        <hr />
        {documentData?.files?.map((item, idx) => (
          <div
            key={`notice-file-${idx}`}
            className="flex w-full cursor-pointer items-center justify-between font-semibold"
          >
            <div>{item.name}</div>
            <div
              onClick={() => handleSingleDownload(item.originUrl, item.name)}
              className="cursor-pointer"
            >
              <Image src={Download} width={17} height={17} alt="file" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
