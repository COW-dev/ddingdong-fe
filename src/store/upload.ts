import { create } from 'zustand';

type VideoUpload = {
  mediaId: string;
  uploading: boolean;
};

type UploadStore = {
  videoUploads: Record<string, VideoUpload>;
  setVideoUploading: (id: string, uploading: boolean) => void;
  removeVideoUpload: (id: string) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  videoUploads: {},
  setVideoUploading: (id, uploading) =>
    set((state) => ({
      videoUploads: {
        ...state.videoUploads,
        [id]: { ...state.videoUploads[id], mediaId: id, uploading },
      },
    })),

  removeVideoUpload: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.videoUploads;
      return { videoUploads: rest };
    }),
}));
