import Image from 'next/image';
// import Link from 'next/link';

export default function Banner() {
  return (
    // <Link href="/" className="inline-block">
    <div className="flex h-56 w-full flex-col items-center justify-center rounded-xl bg-sky-100 md:h-48 md:flex-row">
      <Image
        src="/hearts.png"
        width={1000}
        height={1000}
        priority
        alt="hearts"
        className="mx-4 w-28 drop-shadow-sm md:w-40"
      />
      <div className="mx-4 mb-1 text-center drop-shadow-sm md:mb-0 md:text-left">
        <p className="my-0.5 text-2xl font-bold md:text-4xl">
          띵동이 탄생했어요!
        </p>
        <p className="px-10 text-base font-semibold leading-tight text-gray-600 md:px-0 md:text-xl">
          명지대학교의 모든 동아리를 띵동에서 확인해 보세요.
        </p>
      </div>
    </div>
    // </Link>
  );
}
