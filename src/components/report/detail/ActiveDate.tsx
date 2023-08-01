import { useState } from 'react';

type Prop = {
  startDate: string;
};
export default function ActiveDate({ startDate }: Prop) {
  return (
    <span className="md:text-md text-basw py-3 font-medium opacity-70 md:pb-3">
      {startDate}
    </span>
  );
}
