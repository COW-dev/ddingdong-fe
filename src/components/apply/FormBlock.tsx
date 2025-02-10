interface FormBlockProps {
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FormBlock({
  title,
  startDate,
  endDate,
  isActive,
  onClick,
}: FormBlockProps) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm font-semibold text-gray-400">
          {startDate} ~ {endDate}
        </p>
      </div>
      <div>
        {isActive ? (
          <span className="rounded px-2 py-1 font-semibold text-green-400">
            진행중
          </span>
        ) : (
          <span className="rounded px-2 py-1 font-semibold text-red-400">
            종료
          </span>
        )}
      </div>
    </div>
  );
}
