const type: Record<string, RegExp> = {
  phoneNumber: /^\d{2,3}-\d{3,4}-\d{4}$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
  location: /^S\d{4,}$/,
  date: /\d{4}-\d{2}-\d{2}/,
};

type Props = {
  value: string;
  type: string;
};

export function validator(props: Props) {
  return Boolean(props.value.match(type[props.type]));
}

export function isMissingData(data: { [x: string]: unknown }) {
  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key) && String(data[key]).trim() === '') {
      return true;
    }
  }
  return false;
}
