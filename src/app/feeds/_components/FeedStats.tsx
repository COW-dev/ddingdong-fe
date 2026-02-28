'use client';

import { Body2, Body3, Flex, Icon } from 'ddingdong-design-system';
import { motion, useAnimation } from 'framer-motion';

type FeedStatsProps = {
  likeCount: number;
  commentCount: number;
  viewCount: number;
  size?: 'sm' | 'md';
  onLike?: () => void;
};

export function FeedStats({
  likeCount,
  commentCount,
  viewCount,
  size = 'md',
  onLike,
}: FeedStatsProps) {
  const controls = useAnimation();
  const iconSize = size === 'sm' ? 18 : 22;
  const TextComponent = size === 'sm' ? Body3 : Body2;

  const handleLike = async () => {
    if (!onLike) return;

    onLike();
    await controls.start({
      scale: [1, 1.6, 0.85, 1.2, 1],
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    });
  };

  return (
    <Flex gap={4} alignItems="center">
      <Flex
        as={onLike ? 'button' : 'div'}
        gap={1}
        alignItems="center"
        onClick={handleLike}
        className={onLike ? 'cursor-pointer' : ''}
      >
        <motion.span
          animate={controls}
          whileTap={onLike ? { scale: 0.9 } : undefined}
          className="inline-flex"
        >
          <Icon name="like" size={iconSize} color={onLike ? 'red' : 'gray'} />
        </motion.span>
        <TextComponent className="text-gray-600">{likeCount}</TextComponent>
      </Flex>
      <Flex gap={1} alignItems="center">
        <Icon name="comment" size={iconSize} color="gray" />
        <TextComponent className="text-gray-600">{commentCount}</TextComponent>
      </Flex>
      <Flex gap={1} alignItems="center">
        <Icon name="eye" size={iconSize} color="gray" />
        <TextComponent className="text-gray-600">{viewCount}</TextComponent>
      </Flex>
    </Flex>
  );
}
