import dynamic from 'next/dynamic';
import loadingJson from './loading.json';

type Props = {
  size?: string;
};

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });
export default function Loading({ size = 'w-40' }: Props) {
  return <Lottie play animationData={loadingJson} className={size} />;
}
