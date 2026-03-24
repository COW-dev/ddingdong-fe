export type OptimizeResult = {
  file: File;
};

export const optimizeWithWorker = (
  file: File,
  quality: number,
): Promise<OptimizeResult> => {
  return new Promise((resolve) => {
    let worker: Worker;
    const originalSize = file.size;

    try {
      worker = new Worker('/image-worker.js');
    } catch {
      resolve({ file });
      return;
    }

    const timeout = setTimeout(() => {
      worker.terminate();
      resolve({ file });
    }, 10000);

    worker.onmessage = (e) => {
      clearTimeout(timeout);
      worker.terminate();

      const { success, blob, convertedSize } = e.data;

      if (!success) {
        resolve({ file });
        return;
      }

      if (convertedSize < originalSize) {
        const webpFile = new File(
          [blob],
          file.name.replace(/\.[^/.]+$/, '.webp'),
          {
            type: 'image/webp',
            lastModified: file.lastModified,
          },
        );
        resolve({ file: webpFile });
      } else {
        resolve({ file });
      }
    };

    worker.onerror = () => {
      clearTimeout(timeout);
      worker.terminate();
      resolve({ file });
    };

    worker.postMessage({ file, quality, maxWidth: 1280 });
  });
};

export const optimizeImage = async (
  file: File,
  quality: number = 0.7,
): Promise<OptimizeResult> => {
  if (!file.type.startsWith('image/')) {
    return { file };
  }
  if (file.type === 'image/webp') {
    return { file };
  }

  if (typeof Worker === 'undefined') {
    return { file };
  }

  return optimizeWithWorker(file, quality);
};
