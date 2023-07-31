import Image, { StaticImageData } from 'next/image';
import Place from '@/assets/place.svg';
import { StudentInfo } from '@/types/report';
type ReportDetailProps = {
  reportId: number;
  content: string;
  place: string;
  startDate: Date;
  endDate: Date;
  imageUrl: StaticImageData;
  participants: StudentInfo[];
};

export default function Detail({
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
        {/* md */}
        <div className="hidden md:inline-block">
          <div className="flex flex-col items-center md:flex-row">
            <span className=" md:text-md text-basw py-3 font-medium opacity-70 md:pb-3">
              {startDate?.toDateString()} ~ {endDate?.toDateString()}
            </span>
            <div className="my-2  flex h-10 flex-row items-center rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-sm font-semibold md:mx-3 md:mt-0 md:text-base">
              <Image src={Place} alt="장소" width={25} height={25} />
              <span className="mx-2 pr-2 text-sm text-gray-400">{place}</span>
            </div>
          </div>
        </div>
        {/* sm */}
        <div className="inline-block bg-black md:hidden ">
          <div className="flex w-full flex-col items-center  rounded-xl">
            <Image
              src={imageUrl}
              className="over m-auto object-scale-down"
              alt="이미지"
            />
            <div className="absolute flex w-full flex-1 justify-between bg-white bg-opacity-70 px-[10%] text-gray-500">
              <div className="p-3">
                <div className="text-2xl font-bold">1주차</div>
                <span className="md:text-md text-basw py-3 font-medium opacity-70 md:pb-3">
                  {startDate?.toDateString()}
                </span>
              </div>
              <div className="my-2  flex h-10 flex-row items-center rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-sm font-semibold md:mx-3 md:mt-0 md:text-base">
                <Image src={Place} alt="장소" width={25} height={25} />
                <span className="mx-2 pr-2 text-sm text-gray-400">{place}</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
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
      <div className="flex hidden justify-center md:inline-block md:w-1/2">
        <Image
          src={imageUrl}
          className="m-auto  object-scale-down md:inline-block"
          alt="이미지"
          width={380}
          height={380}
        />
      </div>
    </div>
  );
}
