import Link from 'next/link';

type NeutralButtonProps = {
  href: string;
  children: string;
};

export default function NeutralButton({ href, children }: NeutralButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block rounded-xl bg-gray-100 px-4 py-2.5 font-semibold text-gray-500 transition-colors hover:bg-gray-200"
    >
      {children}
    </Link>
  );
}
