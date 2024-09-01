export function downloadBlob(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const $a = Object.assign(document.createElement('a'), {
    href: url,
    download: fileName,
  });
  document.body.appendChild($a);
  $a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild($a);
}
