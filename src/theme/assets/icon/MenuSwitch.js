import { Icon } from "@chakra-ui/react";

export default function MenuSwitchIcon(props) {
  return (
    <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="none" {...props}>
      <g
        clipPath="url(#Shuffle__a)"
        stroke="#7AE7FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.25 7.313h2.342a6.5 6.5 0 0 1 5.29 2.721l4.237 5.932a6.5 6.5 0 0 0 5.289 2.722h3.154M21.125 4.875l2.438 2.438-2.438 2.437" />
        <path d="m21.125 16.25 2.438 2.438-2.438 2.437m-6.129-10.921.122-.17a6.5 6.5 0 0 1 5.29-2.722h3.154M3.25 18.687h2.342a6.5 6.5 0 0 0 5.29-2.722l.121-.17" />
      </g>
      <defs>
        <clipPath id="#Shuffle__a">
          <path fill="#fff" d="M0 0h26v26H0z" />
        </clipPath>
      </defs>
    </Icon>
  );
}
