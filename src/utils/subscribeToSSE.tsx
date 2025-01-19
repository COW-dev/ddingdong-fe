import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import toast from 'react-hot-toast';
import { useUploadStore } from '@/store/upload';

export function subscribeToSSE(token: string, mediaId: string) {
  const { setVideoUploading, removeVideoUpload } = useUploadStore.getState();
  const EventSource = EventSourcePolyfill || NativeEventSource;

  const eventSource = new EventSource(
    process.env.NEXT_PUBLIC_BASE_URL + `sse/subscribe`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      withCredentials: true,
    },
  );
  const toastId = toast.loading('비디오를 업로드가 시작되었습니다.');

  setVideoUploading(mediaId, true);

  eventSource.addEventListener('connect', (event) => {
    if ((event as MessageEvent).data === 'Connected successfully!') {
      toast.loading('비디오 업로드 중입니다.', { id: toastId });
    }
  });

  eventSource.addEventListener('sse', (event) => {
    const messageEvent = event as MessageEvent;
    const parsedData = JSON.parse(messageEvent.data);
    if (parsedData.data.convertJobStatus === 'COMPLETE') {
      toast.success('비디오 업로드가 완료되었습니다!', { id: toastId });
      removeVideoUpload(mediaId);
      eventSource.close();
    }

    if (parsedData.data.convertJobStatus === 'ERROR') {
      toast.success('비디오 업로드 중 문제가 발생했습니다.', {
        id: toastId,
        duration: 5000,
      });
      removeVideoUpload(mediaId);
      eventSource.close();
    }
  });
}
