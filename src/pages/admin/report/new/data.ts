const participant = {
  name: '',
  studentId: '',
  department: '',
};

export const EMPTY_DATA = {
  term: 0,
  date: { startDate: new Date(), endDate: new Date() },
  place: '',
  startTime: '00:00',
  endTime: '00:00',
  uploadFiles: null,
  content: '',
  participants: [
    participant,
    participant,
    participant,
    participant,
    participant,
  ],
};
