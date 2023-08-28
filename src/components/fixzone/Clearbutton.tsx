import Image from 'next/image';
import Check from '@/assets/check.svg';
import Progress from '@/assets/progress.svg';
type Props = {
  isCompleted: boolean;
};
export default function ClearButton({ isCompleted }: Props) {
  return (
    <div className="flex h-8 items-center justify-between gap-2 rounded-xl bg-white p-6 shadow-lg ">
      <div>{isCompleted ? `처리를 완료했어요.` : `처리중인 요청이예요.`}</div>
      <Image
        src={isCompleted ? Check : Progress}
        width={25}
        height={25}
        alt="isProcess"
      />
    </div>
  );
}