import React from 'react';

interface FormBlockProps {
  title: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function FormBlock({
  title,
  startDate,
  endDate,
  isActive,
}: FormBlockProps) {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-lg border bg-white p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm font-semibold text-gray-400">
          {startDate} ~ {endDate}
        </p>
      </div>
      <div>
        {isActive ? (
          <span className="rounded px-2 py-1 font-semibold text-green-500">
            진행중
          </span>
        ) : (
          <span className="rounded px-2 py-1 font-semibold text-red-500">
            종료
          </span>
        )}
      </div>
    </div>
  );
}
