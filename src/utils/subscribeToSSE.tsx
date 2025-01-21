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
      heartbeatTimeout: 120000,
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
  eventSource.onerror = () => {
    toast(
      `동영상 처리에 시간이 조금 더 필요합니다.\n 곧 완료되니 잠시만 기다려 주세요!`,
      {
        id: toastId,
        duration: 7000,
        icon: '⏰',
      },
    );
    removeVideoUpload(mediaId);
    eventSource.close();
  };
}
