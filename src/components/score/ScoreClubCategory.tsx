import Image from 'next/image';

type ScoreProps = {
  scoreCategory: string;
  icon: string;
  amount: number;
};
export default function ScoreClubCategory({
  scoreCategory,
  icon,
  amount,
}: ScoreProps) {
  return (
    <>
      <Image
        src={icon}
        width={50}
        height={50}
        alt="이미지"
        className="mb-2 ml-2 md:mb-auto md:ml-4 md:mt-2"
      />
      <div className="my-2 mb-2 flex w-36 flex-col justify-end text-right md:mx-1 md:mb-5  ">
        <span className=" text-md mr-2 font-bold text-blue-500 lg:text-xl">
          {scoreCategory}
        </span>
        <span className="text-md mr-2 font-bold md:text-xl">
          {amount.toFixed(3)}점
        </span>
      </div>
    </>
  );
}
