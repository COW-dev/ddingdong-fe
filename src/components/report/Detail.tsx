import Image, { StaticImageData } from 'next/image';
import Place from '@/assets/place.svg';
import { StudentInfo } from '@/types/report';
type ReportDetailProps = {
  reportId: number;
  content: string;
  place: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  imageUrls: string;
  participants: StudentInfo[];
};

export default function Detail({
  reportId,
  content,
  place,
  startDate,
  startTime,
  endTime,
  imageUrls,
  participants,
}: ReportDetailProps) {
  return (
    <div className="flex flex-col  md:m-3 md:flex-row">
      <div className="mb-5 flex flex-col md:w-2/3">
        <div className="flex flex-col items-center md:flex-row">
          <span className=" md:text-md py-3 text-base font-medium opacity-70 md:pb-3">
            {startDate?.toDateString()}
          </span>
          <span className="md:ml-3">
            {' '}
            {startTime?.toString()} 23:30 ~ 14:00 {endTime?.toString()}
          </span>
          <div className="mt-2 flex h-11 w-1/2 flex-row items-center rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-sm font-semibold md:ml-3 md:mt-0 md:text-base">
            <Image src={Place} alt="장소" width={25} height={25} />
            <span className="mx-2  pr-2 text-sm text-gray-400">{place}</span>
          </div>
        </div>
        <div>
          <p className=" text-md my-3 font-semibold text-blue-500 md:text-lg">
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
        <div>
          <p className=" text-md my-3 font-semibold text-blue-500 md:text-lg">
            활동 내용
          </p>
          <span className="md:text-md h-24 w-full rounded-xl text-base font-medium opacity-70 md:pb-3">
            {content}
          </span>
        </div>
      </div>
      <div className="flex justify-center md:w-1/2 ">
        <Image
          src={imageUrls}
          className="m-auto object-scale-down"
          alt="이미지"
          width={380}
          height={380}
        />
      </div>
    </div>
  );
}
