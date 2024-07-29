import Image from 'next/image';
import Download from '@/assets/download.svg';
import { useAllDocuments } from '@/hooks/api/document/useAllDocuments';

export default function DocumentList() {
  const { data } = useAllDocuments();
  const documents = data?.data;

  return (
    <ul className="mt-14 w-full md:mt-16">
      {[...(documents ?? [])]?.reverse().map((document) => (
        <li key={document.id} className="mb-1 w-full border-b">
          <div className="md:ph-5 grid w-full grid-cols-[auto_1fr] items-center pb-4 pt-3 transition-opacity hover:opacity-50 md:pt-3.5">
            <div className="col-span-1 flex flex-col">
              <div className="block text-base font-semibold sm:hidden">
                {document.title && document.title.length < 25
                  ? document.title
                  : document.title?.substring(0, 25) + '..'}
              </div>
              <div className="hidden text-xl font-semibold sm:block">
                {document.title}
              </div>
              <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                {new Date(document.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="col-span-1 mr-4 justify-self-end md:w-16">
              <Image
                className="h-5 w-5 cursor-pointer md:h-6 md:w-6"
                src={Download}
                alt={'다운로드 이미지'}
                width={24}
                height={24}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
