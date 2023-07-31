type Prop = {
  startDate: Date;
};
export default function Date({ startDate }: Prop) {
  return (
    <span className="md:text-md text-basw py-3 font-medium opacity-70 md:pb-3">
      {startDate?.toDateString()}
    </span>
  );
}
