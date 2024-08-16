import { useEffect, useState } from 'react';
import Image from 'next/image';
import Download from '@/assets/download.svg';
import { useDocumentInfo } from '@/hooks/api/document/useDocumentInfo';
import { DocumentDetail } from '@/types/document';
import { parseImgUrl } from '@/utils/parse';

type Props = {
  documentId: number;
};
export default function DocumentDownload({ documentId }: Props) {
  const [documentData, setDocumentData] = useState<DocumentDetail>({
    id: documentId,
    title: '제목',
    fileUrls: [{ fileUrl: '', name: '' }],
    imageUrls: [''],
  });

  const { data } = useDocumentInfo(documentId);
  console.log('data', data);

  useEffect(() => {
    if (data) {
      setDocumentData(data.data);
    }
  }, [data]);

  const handleDownloadAll = () => {
    documentData.fileUrls.forEach((file, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = parseImgUrl(file.fileUrl);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-2">
        <div
          className="flex cursor-pointer justify-between"
          onClick={handleDownloadAll}
        >
          <div className="font-semibold">모두 다운로드</div>
          <Image src={Download} width={17} height={17} alt="file" />
        </div>
        <hr />
        {Array.isArray(documentData.fileUrls) &&
          documentData.fileUrls.map((item, idx) => (
            <div
              key={`notice-file-${idx}`}
              className="flex w-full cursor-pointer items-center justify-between font-semibold"
            >
              <div>{item.name}</div>
              <a href={parseImgUrl(item.fileUrl)} download target="_blank">
                <Image src={Download} width={17} height={17} alt="file" />
              </a>
            </div>
          ))}
      </div>
    </>
  );
}
