import Image from 'next/image';
import Canlender from '@/assets/calender.svg';
import Group from '@/assets/group.svg';
import Pin from '@/assets/pin.svg';
type Props = {
  club: string;
  createdAt: string;
  location: string;
};
export default function FixItemInfo({ club, createdAt, location }: Props) {
  return (
    <div className="flex justify-around rounded-xl bg-white p-3 px-5 font-semibold  text-gray-500  shadow-xl">
      <div className="flex flex-col items-center justify-center ">
        <Image
          src={Group}
          alt="clubName"
          width={35}
          height={35}
          className="my-2"
        />
        <div className="text-xs leading-none">동아리</div>
        <div className="text-sm leading-none"> {club.toUpperCase()}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={Canlender}
          alt="time"
          width={25}
          height={25}
          className="my-2"
        />
        <div className="text-xs leading-none">제출시각</div>
        <div className="text-sm leading-none"> {createdAt}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={Pin}
          alt="clubRoom"
          width={25}
          height={25}
          className="my-2"
        />
        <div className="text-xs leading-none">동아리방</div>
        <div className="text-sm leading-none"> {location}</div>
      </div>
    </div>
  );
}
