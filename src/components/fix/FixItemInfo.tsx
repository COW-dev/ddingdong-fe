import { parseDate } from '@/utils/parse';

type Props = {
  club: string;
  createdAt: string;
  location: string;
};
export default function FixItemInfo({ club, createdAt, location }: Props) {
  return (
    <div className="flex justify-between rounded-xl bg-white font-semibold  text-gray-500 ">
      <div className="flex flex-col items-center justify-center ">
        <div className="p-3 text-lg font-bold leading-none text-blue-500 md:text-xl">
          동아리
        </div>
        <div className="text-base"> {club}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-3 text-lg font-bold leading-none text-blue-500 md:text-xl">
          신청일
        </div>
        <div className="font-semibold md:text-[95%] ">
          {parseDate(createdAt)}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="p-3 text-lg font-bold leading-none text-blue-500 md:text-xl">
          동아리방
        </div>
        <div className="text-base font-semibold "> {location}</div>
      </div>
    </div>
  );
}
