import Link from 'next/link';

type BottomButton = {
  href: string;
  content: string;
};

export default function BottomButton({ href, content }: BottomButton) {
  return (
    <div className="fixed bottom-4 left-0 z-10 flex w-full items-center justify-center px-4 lg:hidden">
      <button className="button-shadow w-full rounded-xl bg-blue-500 text-base font-bold text-white transition-colors hover:bg-blue-400 md:text-lg">
        <Link href={href} className="inline-block w-full py-4">
          {content}
        </Link>
      </button>
    </div>
  );
}
