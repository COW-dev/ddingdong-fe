import { useState } from 'react';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useDeleteFeed } from '@/app/_api/mutations/feed';
import { feedQueryOptions } from '@/app/_api/queries/feed';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export const useFeedAdmin = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(feedQueryOptions.my());

  const { observerTarget } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const feeds = data.pages.flatMap((page) => page.clubFeeds);

  const deleteMutation = useDeleteFeed();

  const handleRadioChange = (id: number) => {
    setSelectedFeed(id === selectedFeed ? null : id);
  };

  const handleEditModeChange = (newEditMode: boolean) => {
    setEditMode(newEditMode);
    if (!newEditMode) {
      setSelectedFeed(null);
    }
  };

  const handleDelete = (onClose: () => void) => {
    if (editMode && selectedFeed) {
      deleteMutation.mutate(
        { feedId: selectedFeed },
        {
          onSuccess: () => {
            toast.success('피드를 성공적으로 삭제했어요.');
            setEditMode(false);
            setSelectedFeed(null);
            onClose();
          },
          onError: () => {
            toast.error('피드 삭제에 실패했어요.');
            onClose();
          },
        },
      );
    } else {
      onClose();
    }
  };

  return {
    feeds,
    observerTarget,
    editMode,
    selectedFeed,
    handleRadioChange,
    handleEditModeChange,
    handleDelete,
  };
};
