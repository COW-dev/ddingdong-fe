import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import ReportNoticeModal from '@/components/modal/reportNoticeModal';
import { ROLE_TYPE } from '@/constants/text';
import { ReportDetail } from '@/types/report';
import ActiveDate from './ActiveDate';

import Time from './Time';
export default function Index({
  reportData,
}: {
  reportData: ReportDetail;
}): JSX.Element {
  const { content, place, startDate, endDate, imageUrls, participants } =
    reportData ?? {};

  const [data, setData] = useState(reportData);
  const [image, setImage] = useState<string>();
  const [{ role }] = useCookies(['role']);
  useEffect(() => {
    setData(data);
    setImage(imageUrls && imageUrls[0]);
  }, [imageUrls]);

  const parsedImgUrl = image && image.slice(0, 8) + image.slice(9);

  const [info, setInfo] = useState<boolean>(true);
  return (
    <div className="flex flex-col items-center truncate md:m-3 md:flex-row md:justify-evenly lg:justify-between ">
      <div className="mb-5 flex flex-col">
        {/* sm */}
        <div className="mb-4 inline-block shadow-xl md:hidden">
          <div className="z-10 flex flex-col items-center overflow-hidden rounded-xl ">
            <div className="relative">
              {parsedImgUrl && (
                <Image
                  src={parsedImgUrl}
                  className="bg-gray-50 object-cover"
                  alt="reportImage"
                  width={500}
                  height={500}
                />
              )}
              <div
                className={`absolute right-2 ${
                  info ? `top-[11vh]` : `top-[1vh]`
                } z-30`}
              >
                <Image
                  src={info ? ArrowUp : ArrowDown}
                  width={20}
                  height={20}
                  alt="show"
                  onClick={() => setInfo(!info)}
                />
              </div>

              {info && (
                <>
                  <div className="absolute top-0 z-20 flex w-full flex-1 justify-between bg-white bg-opacity-70 text-gray-500">
                    <div className="m-3">
                      <div className="text-xl font-semibold">1 회차</div>
                      <ActiveDate startDate={startDate} endDate={endDate} />
                    </div>
                    <Time place={place} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* sm끗 */}

        {/* md */}
        <div className="hidden md:inline-block">
          <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
            <ActiveDate startDate={startDate} endDate={endDate} />
            <Time place={place} />
          </div>
        </div>
        {/* md끗 */}

        <div className="p-3 md:p-0">
          <p className="my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          <ul
            className={`md:text-md grid w-full grid-cols-1 gap-1.5 text-base font-medium opacity-70 md:grid-cols-1 md:pb-3 ${
              role === ROLE_TYPE.ROLE_CLUB && `lg:grid-cols-2`
            }`}
          >
            {participants?.map((participant) => (
              <li key={participant.name}>
                {participant.name} | {participant.studentId} |
                {participant.department}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3 md:p-0">
          <p className=" my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          <span className="md:text-md h-24 w-full rounded-xl text-base font-medium opacity-70 md:pb-3">
            {content}
          </span>
        </div>
      </div>
      <div className="hidden w-2/5 justify-center overflow-hidden rounded-xl shadow-xl md:flex md:w-1/2 lg:w-2/5 ">
        {parsedImgUrl && (
          <Image
            src={parsedImgUrl}
            width={600}
            height={600}
            className="over m-auto "
            alt="reportImage"
          />
        )}
      </div>
      <ReportNoticeModal />
    </div>
  );
}
