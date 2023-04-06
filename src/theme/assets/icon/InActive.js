import { Icon } from "@chakra-ui/react";

export default function InActiveIcon(props) {
  return (
    <Icon width="20" height="20" viewBox="0 0 20 20" fill="#7AE7FF" {...props}>
      <circle cx="10" cy="10" r="10" fill="#888" />
      <path
        d="m6.535 6.536 7.071 6.934m.001-6.934-7.07 6.934"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
