export function decodeUrlBase64(encodedUrlBase64: string) {
  const decodedUrlBase64 = decodeURIComponent(encodedUrlBase64 || '');

  const decodedUrl = atob(decodedUrlBase64);

  return decodedUrl;
}
