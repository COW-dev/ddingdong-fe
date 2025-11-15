export type ConvertResult = {
  file: File;
};

/**
 * GIF 파일을 MP4로 변환합니다.
 * 브라우저에서 GIF를 비디오로 처리할 수 있도록 File 객체의 타입을 변경합니다.
 * 실제 변환은 서버에서 처리됩니다.
 */
export const relabelGifToMp4 = async (
  gifFile: File,
): Promise<ConvertResult> => {
  const mp4File = new File([gifFile], gifFile.name.replace(/\.gif$/i, '.mp4'), {
    type: 'video/mp4',
    lastModified: gifFile.lastModified,
  });

  return { file: mp4File };
};

/**
 * 파일이 GIF인지 확인합니다.
 */
export const isGifFile = (file: File): boolean => {
  return file.type === 'image/gif' || file.name.toLowerCase().endsWith('.gif');
};
