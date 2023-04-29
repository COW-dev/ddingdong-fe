import Link from 'next/link';

type NeutralButtonProps = {
  href: string;
  children: string;
};

export default function NeutralButton({ href, children }: NeutralButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200 md:text-base"
    >
      {children}
    </Link>
  );
}
