import { useState, useEffect } from 'react';

import { Flex } from '../Flex';
import { Icon } from '../Icon';

type Props = {
  files: File[] | null;
  previewUrls: string[];
  onRemoveFile: (index: number) => void;
  multiple: boolean;
};

export function MediaPreview({ files, previewUrls, onRemoveFile, multiple }: Props) {
  if (!multiple) {
    return <MediaPreviewItem file={files?.[0]} previewUrl={previewUrls[0]} />;
  }
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
      {previewUrls?.map((previewUrl, index) => (
        <div key={index} className="relative aspect-square">
          <MediaPreviewItem file={files?.[index]} previewUrl={previewUrl} />
          <button
            type="button"
            onClick={() => onRemoveFile(index)}
            className="absolute top-2 right-2 cursor-pointer rounded-full bg-white/75 p-1"
          >
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

type MediaPreviewItemProps = {
  file?: File;
  previewUrl: string;
};
function MediaPreviewItem({ file, previewUrl }: MediaPreviewItemProps) {
  const [isVideo, setIsVideo] = useState<boolean>(false);

  useEffect(() => {
    if (file) return setIsVideo(file.type.startsWith('video/'));
    getMimeType(previewUrl).then((type) => {
      if (type) setIsVideo(type.startsWith('video/'));
      else setIsVideo(false);
    });
  }, [file, previewUrl]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      className="relative h-full w-full rounded-xl border border-gray-200 bg-gray-50"
    >
      {isVideo ? (
        <video
          src={previewUrl}
          controls
          className="h-full max-h-[500px] w-full max-w-[500px] object-contain"
        />
      ) : (
        <img
          src={previewUrl}
          alt={file ? `미리보기 ${file.name}` : '미리보기 이미지'}
          className="h-full max-h-[500px] w-full max-w-[500px] object-contain"
        />
      )}
    </Flex>
  );
}

async function getMimeType(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.headers.get('Content-Type');
  } catch {
    return null;
  }
}
