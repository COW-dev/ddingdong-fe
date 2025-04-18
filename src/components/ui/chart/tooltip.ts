export const tooltip = {
  padding: 12,
  displayColors: false,
  backgroundColor: '#F3F4F6',
  titleColor: 'black',
  bodyColor: 'black',
  callbacks: {
    title: () => [],
    label: (data: { formattedValue: string }) => {
      return data.formattedValue;
    },
  },
};
