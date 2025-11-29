import { useState } from 'react';

import { Radio, RadioItem, usePortal } from 'ddingdong-design-system';

import { Feed } from '@/app/_api/types/feed';
import { FeedModal } from '@/app/feeds/_components/FeedModal';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export function ClubFeed({
  feeds,
  editMode,
  selectedFeedId,
  onFeedSelect,
}: {
  feeds: Feed[];
  editMode?: boolean;
  selectedFeedId?: number | null;
  onFeedSelect: (feedId: number) => void;
}) {
  const { isOpen, openModal, closeModal } = usePortal();
  const [selectedFeedIdForModal, setSelectedFeedIdForModal] =
    useState<number>(0);

  const handleFeedDetailOpen = (feedId: number) => {
    if (!editMode) {
      setSelectedFeedIdForModal(feedId);
      openModal();
    }
  };

  return (
    <>
      <Radio
        value={selectedFeedId?.toString() ?? ''}
        onValueChange={(value) => {
          const newValue = value === '' ? null : Number(value);
          if (editMode) {
            onFeedSelect(newValue ?? 0);
          }
        }}
        className="contents"
      >
        {feeds?.map((feed, index) => (
          <label
            key={feed.id}
            htmlFor={feed.id.toString()}
            className="relative"
          >
            {editMode && (
              <RadioItem
                value={feed.id.toString()}
                id={feed.id.toString()}
                className="absolute top-2 left-2 z-10"
              />
            )}
            <FeedImageWithRadio
              feed={feed}
              priority={index < 10}
              onClick={() => handleFeedDetailOpen(feed.id)}
            />
          </label>
        ))}
      </Radio>

      {isOpen && selectedFeedIdForModal > 0 && (
        <FeedModal
          feedId={selectedFeedIdForModal}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

type FeedImageWithRadioProps = {
  feed: Feed;
  priority: boolean;
  onClick: VoidFunction;
};

function FeedImageWithRadio({
  feed,
  priority,
  onClick,
}: FeedImageWithRadioProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex aspect-square w-full cursor-pointer border-0 bg-transparent p-0"
    >
      <OptimizedImage
        isSkeleton={!loaded}
        width={500}
        height={600}
        src={feed.thumbnailCdnUrl}
        priority={priority}
        alt={`피드 ${feed.id}`}
        className={`h-full w-full object-cover object-center transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
