const type: Record<string, RegExp> = {
  phoneNumber: /^010-\d{4}-\d{4}$/,
  password: /^[a-zA-Z0-9]{8,}$/,
  location: /^S\d{4,}$/,
};

interface Props {
  value: string;
  type: string;
}

export function validator(props: Props) {
  return Boolean(props.value.match(type[props.type]));
}
