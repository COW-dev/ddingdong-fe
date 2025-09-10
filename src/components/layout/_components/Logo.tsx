import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
  color?: 'black' | 'white';
};

export function Logo({ className = 'w-32', color = 'black' }: Props) {
  return (
    <Link href="/" className="inline-block">
      <Image
        src={color == 'white' ? '/m_logo.png' : '/logo.png'}
        width={1544}
        height={380}
        priority
        alt="ddingdong"
        className={className}
      />
    </Link>
  );
}
