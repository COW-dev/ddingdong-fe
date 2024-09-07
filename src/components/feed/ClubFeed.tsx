import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Feed } from '@/types/feed';
import Skeleton from '../common/Skeleton';

type ClubFeedProps = {
  feeds: Feed[] | undefined | null;
};

export default function ClubFeed({ feeds }: ClubFeedProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (feeds) {
      setLoading(false);
    }
  }, [feeds]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-3">
      {loading
        ? Array(feeds?.length || 1)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="h-auto w-full gap-3">
                <Skeleton />
              </div>
            ))
        : feeds?.map((item, index) => (
            <div key={item.id} className=" border">
              <Image
                src={item.thumbnailUrl}
                alt={`image-${index + 1}`}
                width={500}
                height={500}
                className="h-60 w-full md:h-50"
              />
            </div>
          ))}
    </div>
  );
}
