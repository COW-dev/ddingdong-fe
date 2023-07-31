import Image, { StaticImageData } from 'next/image';
import Place from '@/assets/place.svg';
import { StudentInfo } from '@/types/report';
import Date from './Date';
import Time from './Time';
type ReportDetailProps = {
  reportId: number;
  content: string;
  place: string;
  startDate: Date;
  endDate: Date;
  imageUrl: StaticImageData;
  participants: StudentInfo[];
};

export default function Index({
  content,
  place,
  startDate,
  endDate,
  imageUrl,
  participants,
}: ReportDetailProps) {
  return (
    <div className="flex flex-col items-center md:m-3 md:flex-row">
      <div className="mb-5 flex flex-col">
        {/* sm */}
        <div className="inline-block md:hidden ">
          <div className="flex w-full flex-col items-center overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              className="over m-auto object-scale-down"
              alt="reportImage"
            />
            <div className="absolute flex w-full flex-1 justify-between bg-white bg-opacity-70 px-[10%] text-gray-500">
              <div className="p-3">
                <div className="text-2xl font-bold">1주차</div>
                <Date startDate={startDate} />
              </div>
              <Time place={place} />
            </div>
          </div>
        </div>
        {/* sm끗 */}

        {/* md */}
        <div className="hidden md:inline-block">
          <div className="flex flex-col items-center md:flex-row">
            <Date startDate={startDate} />
            <Time place={place} />
          </div>
        </div>
        {/* md끗 */}

        <div className=" p-3">
          <p className=" my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          <ul className="md:text-md grid w-full grid-cols-1 gap-1.5 text-base font-medium opacity-70 md:grid-cols-2 md:gap-x-4 md:pb-3">
            {participants?.map((participant) => (
              <li key={participant.studentId}>
                {participant.studentName} | {participant.studentId} |{' '}
                {participant.studentMajor}
              </li>
            ))}
          </ul>
        </div>

        <div className=" p-3">
          <p className=" my-3 text-lg font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          <span className="md:text-md h-24 w-full rounded-xl text-base font-medium opacity-70 md:pb-3">
            {content}
          </span>
        </div>
      </div>
      <div className="flex hidden justify-center md:inline-block md:w-1/2">
        <Image
          src={imageUrl}
          className="over m-auto object-scale-down"
          alt="reportImage"
        />
      </div>
    </div>
  );
}
