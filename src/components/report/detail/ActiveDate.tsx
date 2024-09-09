type Prop = {
  startDate: string;
  endDate: string;
};
export default function ActiveDate({ startDate, endDate }: Prop) {
  const [date, startTime] = startDate?.split(' ') ?? [];
  const [, endTime] = endDate?.split(' ') ?? [];
  return (
    <div className="text-base font-medium opacity-70">
      {date ? (
        <>
          일자 <span className="px-1">{date}</span>
          <span>
            {startTime}~{endTime}
          </span>
        </>
      ) : (
        <span className="text-gray-400">일자없음</span>
      )}
    </div>
  );
}
