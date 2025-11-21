import { Fragment, PropsWithChildren } from 'react';

import { Body2, Flex, ImageGallery } from 'ddingdong-design-system';

import { UrlType } from '@/app/_api/types/file';
import { sortByOrder } from '@/utils/change';

type NoticeDetailContentProps = {
  content: string;
  images?: UrlType[];
};
export function NoticeDetailContent({
  content,
  images,
}: NoticeDetailContentProps) {
  const sortedImages = sortByOrder(images ?? []);

  return (
    <NoticeDetailContainer>
      {sortedImages.length > 0 && (
        <Flex justifyContent="center" className="my-6 w-full">
          <ImageGallery
            images={sortedImages.map((image) => {
              const separator = image.cdnUrl.includes('?') ? '&' : '?';
              return {
                url: decodeURIComponent(
                  `${image.cdnUrl}${separator}w=768&f=webp`,
                ),
                alt: image.fileName,
              };
            })}
          />
        </Flex>
      )}
      {content.split('\r\n').map((line, idx) => (
        <Fragment key={line + idx}>
          <Body2 weight="medium">{line}</Body2>
        </Fragment>
      ))}
    </NoticeDetailContainer>
  );
}

function NoticeDetailContainer({ children }: PropsWithChildren) {
  return (
    <Flex dir="col" className="w-full py-8 md:py-10">
      {children}
    </Flex>
  );
}
