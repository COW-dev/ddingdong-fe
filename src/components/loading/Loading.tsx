import dynamic from 'next/dynamic';

import loadingJson from './loading.json';

type Props = {
  className?: string;
};

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });
export function Loading({ className = 'w-40' }: Props) {
  return <Lottie play animationData={loadingJson} className={className} />;
}
