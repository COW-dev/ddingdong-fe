import Image from 'next/image';
import { motion as m } from 'framer-motion';
import { SLIDER_ANIMATION } from '@/utils/motions';

export default function NewYear() {
  const IMG = ['/cloud-1.png', '/cloud-2.png'];
  return (
    <div className="relative w-20">
      <div className="absolute -top-1 left-1/2 md:-top-2.5">
        <Image src={'/sun.png'} width={40} height={40} alt={'해'} />
      </div>

      <div className="relative pt-10">
        {IMG.map((src, idx) => (
          <m.div
            key={idx}
            initial={SLIDER_ANIMATION.initial}
            animate={SLIDER_ANIMATION.animate}
            className={`absolute ${
              idx === 0 ? 'left-0 top-0' : 'left-5 top-4'
            }`}
          >
            <Image src={src} width={25} height={25} alt={'구름'} />
          </m.div>
        ))}
      </div>
    </div>
  );
}
