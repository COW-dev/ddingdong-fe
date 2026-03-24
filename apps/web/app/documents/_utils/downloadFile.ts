import { toast } from 'react-hot-toast';

export const downloadBlob = (blob: Blob, fileName: string) => {
  try {
    const url = window.URL.createObjectURL(blob);
    const $a = Object.assign(document.createElement('a'), {
      href: url,
      download: fileName,
    });
    document.body.appendChild($a);
    $a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild($a);
  } catch {
    toast.error('파일 다운로드 중 오류가 발생했습니다.');
  }
};

export const downloadFile = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    downloadBlob(blob, filename);
  } catch (err) {
    toast.error('파일 다운로드 중 오류가 발생했습니다.');
    throw err;
  }
};

export const downloadAll = async (
  data: { originUrl: string; name: string }[],
) => {
  if (!data.length) {
    toast.error('다운로드할 파일이 없습니다.');
    return;
  }
  const totalFiles = data.length;
  toast.success(`${totalFiles}개 파일 다운로드를 시작합니다.`);

  const downloads = data.map((file, index) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        downloadFile(file.originUrl, file.name)
          .catch(() => {
            toast.error(`${file.name}파일 다운로드에 실패했어요. `);
          })
          .finally(resolve);
      }, index * 200);
    });
  });

  await Promise.all(downloads);
};
