type BottomButtonProps = {
  href: string;
  children: string;
};

export default function BottomButton({ href, children }: BottomButtonProps) {
  return (
    <div className="fixed bottom-4 left-0 z-10 flex w-full items-center justify-center px-4 lg:hidden">
      <button className="button-shadow w-full rounded-xl bg-blue-500 text-base font-bold text-white transition-colors hover:bg-blue-600 md:text-lg">
        <a
          href={href ? href : void 0}
          target="_blank"
          className="inline-block w-full py-4"
        >
          {children}
        </a>
      </button>
    </div>
  );
}
