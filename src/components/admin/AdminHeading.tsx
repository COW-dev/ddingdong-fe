type AdminHeadingProps = {
  clubName: string;
  clubScore: number;
};

export default function AdminHeading({
  clubName,
  clubScore = 0,
}: AdminHeadingProps) {
  return (
    <div className="flex w-full items-end justify-between">
      <div className="mt-7 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="md:mr-1.5">안녕하세요,</div>
        <span className="text-blue-500">{clubName}</span>
        <span className="ml-1 md:ml-1.5">님</span>
      </div>
      <div className="rounded-xl border-[1.5px] border-gray-200 p-3 text-lg font-semibold text-blue-500 md:p-4 md:text-xl">
        {clubScore}점
      </div>
    </div>
  );
}
