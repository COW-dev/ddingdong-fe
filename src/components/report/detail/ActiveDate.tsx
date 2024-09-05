type Prop = {
  startDate: string;
  endDate: string;
};
export default function ActiveDate({ startDate, endDate }: Prop) {
  const [date, startTime] = startDate?.split(' ') ?? [];
  const [, endTime] = endDate?.split(' ') ?? [];

  return (
    <div
      className={date ? 'text-base font-medium opacity-70 md:pb-3' : 'hidden'}
    >
      <span className="pr-1">{date}</span>
      <span>
        {startTime}~{endTime}
      </span>
    </div>
  );
}
