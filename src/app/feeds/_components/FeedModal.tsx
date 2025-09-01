import Image from 'next/image';
import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Avatar, Body1, Flex, Modal } from 'ddingdong-design-system';

import { feedQueryOptions } from '@/app/_api/queries/feed';

import VideoPlayer from './VideoPlayer';

type FeedModalProps = {
  feedId: number;
  isOpen: boolean;
  closeModal: () => void;
};
export function FeedModal({ feedId, isOpen, closeModal }: FeedModalProps) {
  const { data: feed } = useSuspenseQuery(feedQueryOptions.detail(feedId));

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="md:h-[550px] md:w-[800px]">
        <Flex dir="col">
          <Flex className="relative w-full bg-black md:h-[400px]">
            {feed.feedType === 'VIDEO' ? (
              <VideoPlayer videoUrl={feed.fileUrls.cdnUrl} />
            ) : (
              <>
                <Image
                  fill
                  priority
                  src={feed.fileUrls.cdnUrl}
                  alt="동아리 피드"
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="h-full w-full object-contain"
                />
              </>
            )}
          </Flex>
          <Flex dir="col" alignItems="start" className="mt-2 w-full px-4 py-2">
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
              <Body1>{feed.clubProfile.name}</Body1>
            </Link>
            <Flex dir="col" className="ml-2">
              <Body1>{feed.activityContent}</Body1>
              <Body1 className="text-gray-500">{feed.createdDate}</Body1>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Modal>
  );
}
