import { Body3, Card, Flex, ImageGallery } from 'ddingdong-design-system';

import { FixPostInfo } from '@/app/admin/fix/[id]/_components/FixPostInfo';

import { DetailFix } from '@/app/_api/types/fix';
import { UrlType } from '@/app/_api/types/file';

export function FixPost({ post }: { post: DetailFix }) {
  const { requestedAt, images, clubName, clubLocation, content } = post;

  const sortedImages = sortByOrder(images);
  const isImage = sortedImages.length > 0;
  return (
    <Card className="flex flex-col gap-4 text-gray-500 hover:bg-white md:flex-row">
      <div className="flex-1 p-3">
        <FixPostInfo
          club={clubName}
          createdAt={requestedAt}
          location={clubLocation}
        />
        <Body3 className={`pt-8 ${!content && 'text-gray-300'}`}>
          {content ? content : '작성된 내용이 없습니다.'}
        </Body3>
      </div>
      <Flex
        alignItems="center"
        justifyContent="center"
        className={`min-h-40 flex-1 p-3 ${isImage && 'border border-gray-200'}`}
      >
        {isImage ? (
          <ImageGallery images={sortedImages} />
        ) : (
          <Body3 weight="normal" className="text-gray-300">
            등록된 사진이 없습니다.
          </Body3>
        )}
      </Flex>
    </Card>
  );
}

function sortByOrder(urls: UrlType[]) {
  return urls
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((url) => ({
      url: url.cdnUrl,
      name: url.fileName,
    }));
}
