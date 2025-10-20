import { PropsWithChildren, Fragment } from 'react';

import { Body3, Flex, Icon } from 'ddingdong-design-system';

import { UrlType } from '@/app/_api/types/file';
import { downloadFile } from '@/app/documents/_utils/downloadFile';

export function NoticeDetailFile({ files }: { files: UrlType[] }) {
  return (
    <NoticeDetailFileContainer>
      {files.map((file) => (
        <Fragment key={file.id}>
          <div
            role="button"
            onClick={() => downloadFile(file.cdnUrl, file.fileName ?? '')}
            className="flex cursor-pointer items-center gap-1"
          >
            <Icon name="download" color="gray" size={18} />
            <Body3 weight="medium" className="my-2 text-gray-400">
              {file.fileName}
            </Body3>
          </div>
        </Fragment>
      ))}
    </NoticeDetailFileContainer>
  );
}

function NoticeDetailFileContainer({ children }: PropsWithChildren) {
  return (
    <Flex dir="col" className="mt-1 w-full">
      {children}
    </Flex>
  );
}
