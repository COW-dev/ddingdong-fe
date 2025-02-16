import React, { useState } from 'react';

type Prop = {
  labels: string[];
};
function OptionModal({ labels }: Prop) {
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
            <li className="p-1" key={index}>
              {label}
            </li>
          );
        })}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className="max-w-min cursor-pointer rounded-md bg-slate-100 px-2 py-1"
      >
        옵션
      </div>
    </div>
  );
}

export default OptionModal;
