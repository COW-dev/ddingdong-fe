self.onmessage = async function (event) {
  const { file, quality, maxWidth = 1280 } = event.data;

  try {
    const bitmap = await createImageBitmap(file);
    const needsResize = bitmap.width > maxWidth || bitmap.height > maxWidth;

    let canvas;
    if (needsResize) {
      const scale = Math.min(
        1,
        maxWidth / Math.max(bitmap.width, bitmap.height),
      );
      canvas = new OffscreenCanvas(
        Math.round(bitmap.width * scale),
        Math.round(bitmap.height * scale),
      );
    } else {
      canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context 생성 실패');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const webpBlob = await canvas.convertToBlob({
      type: 'image/webp',
      quality,
    });

    self.postMessage({
      success: true,
      blob: webpBlob,
      convertedSize: webpBlob.size,
    });
  } catch (err) {
    self.postMessage({
      success: false,
      error: err?.message ?? 'Unknown error',
    });
  }
};
