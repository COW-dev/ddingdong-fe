import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import { cn } from '@/lib/utils';
import { ReportDetail } from '@/types/report';
import ActiveDate from './ActiveDate';
import Place from './Place';
interface ResponsiveInfoProps {
  image: string | StaticImageData;
  report: ReportDetail;
  term: number;
}

function ResponsiveInfo({ image, report, term }: ResponsiveInfoProps) {
  const [info, setInfo] = useState<boolean>(true);
  if (!report) return;
  const { place, startDate, endDate, name } = report;
  return (
    <>
      {/* sm */}
      <div className="mb-4 inline-block md:hidden">
        <div className="z-10 flex w-full flex-col items-center rounded-xl ">
          <div className="relative">
            <Image
              src={image}
              priority
              className="bg-gray-50 object-cover"
              alt="reportImage"
              width={500}
              height={500}
            />
            <div
              className={cn(
                'absolute right-2 z-30 ',
                info ? `top-[11vh]` : `top-[1vh]`,
              )}
            >
              <Image
                src={info ? ArrowUp : ArrowDown}
                width={20}
                height={20}
                className={cn(
                  !info && 'w-12 rounded-full bg-white p-4 opacity-70',
                )}
                alt="show"
                onClick={() => setInfo(!info)}
              />
            </div>
            {info && (
              <div className="absolute top-0 z-20 flex w-full flex-1 justify-between bg-white bg-opacity-70 p-4 text-gray-500">
                <div>
                  <div className="text-xl font-semibold">{name}</div>
                  <div>{term}회차</div>
                  <ActiveDate startDate={startDate} endDate={endDate} />
                </div>
                <Place place={place} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* md */}
      <div className="hidden md:inline-block">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <ActiveDate startDate={startDate} endDate={endDate} />
          <Place place={place} />
        </div>
      </div>
    </>
  );
}

export default ResponsiveInfo;
