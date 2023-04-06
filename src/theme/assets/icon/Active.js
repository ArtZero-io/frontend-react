import { Icon } from "@chakra-ui/react";

export default function ActiveIcon(props) {
  return (
    <Icon width="20" height="20" viewBox="0 0 20 20" fill="#7AE7FF" {...props}>
      <path
        d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10Z"
        fill="#7AE7FF"
      />
      <path
        d="m14.813 6.938-6.126 6.125L5.626 10"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
