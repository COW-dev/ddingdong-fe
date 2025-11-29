'use client';

import { type StaticImageData } from 'next/image';

import { Avatar, Card, Body1, Flex, Body3 } from 'ddingdong-design-system';

type Props = {
  name: string;
  score: number;
  imageSrc: string | StaticImageData;
  onClick: () => void;
};

export default function AdminClubCard({
  name,
  score,
  imageSrc,
  onClick,
}: Props) {
  const avatarSrc = typeof imageSrc === 'string' ? imageSrc : imageSrc.src;

  return (
    <Card onClick={onClick} className="w-full p-5 md:p-6">
      <Flex
        dir="row"
        alignItems="center"
        justifyContent="around"
        className="h-full w-full gap-4 md:gap-6"
      >
        <Avatar alt="Avatar" src={avatarSrc} size="xl" />

        <Flex
          dir="col"
          alignItems="center"
          justifyContent="center"
          className="w-[120%] gap-2"
        >
          <Body1 className="whitespace-nowrap">{name}</Body1>
          <Body3 className="mx-1 rounded-lg bg-indigo-100 p-2 px-4 text-indigo-500">
            {score}
          </Body3>
        </Flex>
      </Flex>
    </Card>
  );
}
