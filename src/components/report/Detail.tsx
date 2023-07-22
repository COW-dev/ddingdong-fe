import Image from 'next/image';
import Place from '@/assets/place.svg';
import { StudentInfo } from '@/types';
type ReportDetailProps = {
  reportId: number;
  content: string;
  place: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  participants: StudentInfo[];
};

export default function Detail({
  reportId,
  content,
  place,
  startDate,
  endDate,
  imageUrl,
  participants,
}: ReportDetailProps) {
  return (
    <div className="flex flex-col items-center justify-between md:m-3 md:flex-row">
      <div className="mb-5 flex w-2/3 flex-col">
        <div className="flex flex-col items-center md:flex-row">
          <span className=" md:text-md text-basw py-3 font-medium md:pb-3">
            {startDate.toDateString()} ~ {endDate.toDateString()}
          </span>
          <div className="mt-3 flex h-10 flex-row items-center rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-sm font-semibold md:mx-3 md:mt-0 md:text-base">
            <Image src={Place} alt="장소" width={25} height={25} />
            <span className="mx-2">{place}</span>
          </div>
        </div>
        <div>
          <p className=" text-md my-3 font-semibold text-blue-500 md:text-lg">
            활동 참여 인원
          </p>
          <ul className="md:text-md grid w-full grid-cols-1 gap-1.5 text-base font-medium md:grid-cols-2 md:gap-x-4 md:pb-3">
            {participants.map((participant) => (
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
          <span className="md:text-md h-24 w-full rounded-xl text-base font-medium md:pb-3">
            {content}
          </span>
        </div>
      </div>
      <div className="flex w-2/3 justify-center md:w-1/2 ">
        <Image
          src={Place}
          className="object-scale-down m-auto"
          alt="이미지"
          width={250}
          height={250}
        />
      </div>
    </div>
  );
}
