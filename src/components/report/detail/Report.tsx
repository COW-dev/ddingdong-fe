import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import UnSubmitImage from '@/assets/unsubmit_announce.png';
import { ReportResponse } from '@/types/report';
import { parseImgUrl } from '@/utils/parse';
import ResponsiveInfo from './ResponsiveInfo';

type Props = {
  reportData: ReportResponse;
  term: number;
  image?: File | null;
  setImage?: Dispatch<SetStateAction<File | null>>;
};

export default function Report({ reportData, term }: Props) {
  const { content, image, participants } = reportData ?? {};

  const [data, setData] = useState(reportData);

  const showImage = image?.originUrl ? image.originUrl : UnSubmitImage;

  useEffect(() => {
    setData(data);
  }, [image?.originUrl, data]);

  const isParticipants =
    participants?.filter((participant) => participant.name).length > 0;

  return (
    <div className="flex flex-col items-center justify-between md:m-3 md:flex-row">
      <div className="mb-2 flex flex-col">
        <ResponsiveInfo image={showImage} report={reportData} term={term} />
        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          {isParticipants ? (
            <ul
              className="grid w-full grid-cols-1 gap-1.5 text-base font-medium opacity-70 md:grid-cols-1 md:pb-3
              lg:grid-cols-2"
            >
              {participants?.map((participant, index) => (
                <li
                  key={`participant-${index}`}
                  className={`${participant.name === '' && `hidden`}`}
                >
                  {participant.name} | {participant.studentId} |
                  {participant.department}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-400">작성된 내용이 없습니다.</span>
          )}
        </div>
        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          {content === '' ? (
            <span className="text-gray-400">작성된 내용이 없습니다.</span>
          ) : (
            <span className="h-24 w-full text-base font-medium opacity-70 md:pb-3">
              {content}
            </span>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={showImage}
          className={`bg-gray-50 object-cover`}
          alt="reportImage"
          priority
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
