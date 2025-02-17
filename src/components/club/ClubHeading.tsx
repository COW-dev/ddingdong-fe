import Image from 'next/image';
import { useRouter } from 'next/router';
import Admin from '@/assets/admin.jpg';
import Heading from '@/components/common/Heading';
import { deptCaptionColor } from '@/constants/color';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import { ClubDetail } from '@/types/club';

type ClubHeadingProps = {
  info: ClubDetail;
};

export default function ClubHeading({ info }: ClubHeadingProps) {
  const {
    name,
    category,
    tag,
    leader,
    phoneNumber,
    location,
    regularMeeting,
    profileImage,
    startDate,
    endDate,
    formId,
  } = info;

  const imageSrc = profileImage?.originUrl ? profileImage?.originUrl : Admin;
  const { data } = useAllClubs();
  const isRecruit =
    data?.data.find((club) => club.name === name)?.recruitStatus ===
      '모집 중' && formId;

  const router = useRouter();

  interface MoveToApply {
    (id: number): void;
  }

  const moveToApply: MoveToApply = (id) => {
    router.push(`/apply/${id}`);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-end">
          <div className="h-14 w-14 overflow-hidden rounded-full border-[1.5px] border-gray-100 md:h-20 md:w-20">
            <Image src={imageSrc} width={80} height={80} priority alt="admin" />
          </div>
          <div className="ml-3">
            <Heading>{name}</Heading>
            <div className="flex items-center md:mt-0.5">
              <div
                className={`rounded-lg text-base font-semibold md:text-lg ${deptCaptionColor[category]}`}
              >
                {category}
              </div>
              <div className="px-1.5 text-base font-medium text-gray-300 md:text-lg">
                |
              </div>
              <div className="rounded-lg text-base font-semibold text-gray-500 md:text-lg">
                {tag}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start md:mt-6">
        <div className="flex h-auto w-full flex-col justify-center rounded-xl bg-gray-50 p-6 text-base font-semibold md:justify-center md:px-10 md:py-7 md:text-lg lg:w-[75%]">
          <div className="flex w-full flex-col md:flex-row">
            <div className="mb-1.5 w-full max-w-[20rem]">
              <span className="inline-block w-20 text-gray-500">회장</span>
              <span>{leader}</span>
            </div>
            <div className="mb-1.5">
              <span className="inline-block w-20 text-gray-500">연락처</span>
              <span>{phoneNumber}</span>
            </div>
          </div>
          <div className="flex w-full flex-col md:flex-row">
            <div className="mb-1.5 w-full max-w-[20rem]">
              <span className="inline-block w-20 text-gray-500">동아리방</span>
              <span>{location}</span>
            </div>
            <div className="mb-1.5">
              <span className="inline-block w-20 text-gray-500">모집기간</span>
              {startDate && endDate && (
                <>
                  {startDate.replace(/-/g, '.')}
                  <span className="mx-1">~</span>
                  {endDate.replace(/-/g, '.')}
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <span className="inline-block w-20 text-gray-500">정기모임</span>
            <span>{regularMeeting}</span>
          </div>
        </div>
        <button
          onClick={() => moveToApply(Number(formId))}
          className={`ml-6 hidden rounded-xl bg-blue-500 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-600 lg:block lg:w-[25%] ${
            !isRecruit && `cursor-not-allowed bg-gray-300 hover:bg-gray-300 `
          }`}
          disabled={!isRecruit}
        >
          {isRecruit ? '지원하기' : '모집 마감'}
        </button>
      </div>
    </>
  );
}
