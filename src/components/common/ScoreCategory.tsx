import Image from 'next/image';

type ScoreProps = {
  category: string;
  icon: string;
  amount: number;
};
export default function ScoreCategory({ category, icon, amount }: ScoreProps) {
  return (
    <div className="flex h-full w-full flex-col rounded-lg border-2 shadow-md ">
      <span className="ml-3 mt-3 text-xl font-bold text-purple-500">
        {category}
      </span>
      <div className="relative flex items-center justify-center">
        <Image src={icon} width={130} height={130} alt="이미지" />
        <span className="absolute top-8 m-2 text-4xl font-bold">
          {amount}점
        </span>
      </div>
    </div>
  );
}
