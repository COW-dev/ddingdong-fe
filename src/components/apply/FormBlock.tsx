import { FormBlockData } from '@/types/form';

export default function FormBlock({
  formId,
  title,
  startDate,
  endDate,
  formStatus,
  onClick,
}: FormBlockData) {
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
        {formStatus == '진행 중' && (
          <span className="rounded px-2 py-1 font-semibold text-green-400">
            진행중
          </span>
        )}
        {formStatus == '진행 전' && (
          <span className="rounded px-2 py-1 font-semibold text-gray-400">
            진행전
          </span>
        )}
        {formStatus == '마감' && (
          <span className="rounded px-2 py-1 font-semibold text-red-400">
            종료
          </span>
        )}
      </div>
    </div>
  );
}
