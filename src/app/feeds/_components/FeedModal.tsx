import Link from 'next/link';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  Body1,
  Body3,
  Flex,
  Modal,
  Title2,
} from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';
import { OptimizedImage } from '@/components/common/OptimizedImage';

import VideoPlayer from './VideoPlayer';

type FeedModalProps = {
  feedId: number;
  isOpen: boolean;
  closeModal: () => void;
};
export function FeedModal({ feedId, isOpen, closeModal }: FeedModalProps) {
  const { data: feed, isLoading } = useQuery({
    ...feedQueryOptions.detail(feedId),
    enabled: isOpen,
  });
  const [loaded, setLoaded] = useState(false);

  if (!isOpen || isLoading || !feed) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <FeedModalContainer>
        <Flex dir="col">
          <Flex className="h-48 w-full overflow-hidden rounded-xl bg-black sm:h-64 md:h-[400px]">
            {feed.feedType === 'VIDEO' ? (
              <VideoPlayer videoUrl={feed.fileUrls.cdnUrl} />
            ) : (
              <OptimizedImage
                isSkeleton={!loaded}
                width={800}
                height={400}
                src={feed.fileUrls.cdnUrl}
                alt="동아리 피드"
                className="h-full w-full object-contain"
                onLoad={() => setLoaded(true)}
              />
            )}
          </Flex>
          <Flex
            dir="col"
            alignItems="start"
            className="mt-2 w-full py-2 pr-2 pl-3 sm:pr-4 sm:pl-6"
          >
            <Link
              href={`/club/${feed?.clubProfile.id}`}
              className="flex items-center gap-2"
            >
              <Avatar
                src={feed.clubProfile.profileImageCdnUrl}
                alt={feed.clubProfile.name}
                size="lg"
                className="my-auto object-cover"
              />
              <Title2 weight="medium">{feed.clubProfile.name}</Title2>
            </Link>
            <Flex dir="col" className="mt-2 ml-3">
              <Body1 weight="medium">{feed.activityContent}</Body1>
              <Body3 weight="medium" className="text-gray-500">
                {feed.createdDate}
              </Body3>
            </Flex>
          </Flex>
        </Flex>
      </FeedModalContainer>
    </Modal>
  );
}

function FeedModalContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-[80vw] max-w-[800px] md:h-[550px]">{children}</div>;
}
