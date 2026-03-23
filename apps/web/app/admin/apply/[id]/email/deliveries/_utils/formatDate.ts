export const formatDate = (date: string) => {
  const [day, time] = date.split('T');
  const timeOnly = time.split('.')[0];

  return `${day} ${timeOnly}`;
};
