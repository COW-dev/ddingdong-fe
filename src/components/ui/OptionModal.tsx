import React, { HtmlHTMLAttributes, useState } from 'react';
import { cn } from './utils';

type Prop = {
  labels: string[];
  className?: string;
} & HtmlHTMLAttributes<HTMLButtonElement>;

export default function OptionModal({ labels, className }: Prop) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-end gap-2 text-xs font-semibold">
      <div
        className={`${
          open ? `visible` : 'hidden'
        } z-30 rounded-md bg-white p-2 text-[#6B7280] shadow-lg`}
      >
        {labels.map((label, index) => {
          return (
            <li className="m-1 flex list-none gap-1 p-1" key={index}>
              <span>-</span>
              <div>{label}</div>
            </li>
          );
        })}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          'max-w-min cursor-pointer rounded-md bg-slate-100 px-2 py-1',
          className,
        )}
      >
        옵션
      </div>
    </div>
  );
}
