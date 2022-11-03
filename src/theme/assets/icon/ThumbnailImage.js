import { Icon } from "@chakra-ui/react";

export default function ThumbnailImage({
  color = "#7ae7ff",
  width = "64px",
  height = "64px",
}) {
  return (
    <Icon
      className="LeftArrowIcon"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        opacity=".2"
        d="M2.969 47.063v-41.5a2.594 2.594 0 0 1 2.594-2.594h51.874a2.594 2.594 0 0 1 2.594 2.594v36.312L46.317 28.16a2.596 2.596 0 0 0-3.696 0L28.16 42.62a2.592 2.592 0 0 1-3.697 0l-6.678-6.678a2.592 2.592 0 0 0-3.697 0L2.97 47.062Z"
        fill="currentColor"
      />
      <path
        d="M57.438 2.969H5.562A2.594 2.594 0 0 0 2.97 5.563v51.874a2.594 2.594 0 0 0 2.594 2.594h51.874a2.594 2.594 0 0 0 2.594-2.593V5.562a2.594 2.594 0 0 0-2.593-2.593Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60.031 41.875 46.317 28.161a2.594 2.594 0 0 0-3.696 0L28.16 42.62a2.592 2.592 0 0 1-3.697 0l-6.678-6.68a2.594 2.594 0 0 0-3.697 0L2.97 47.064"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.422 23.719a3.89 3.89 0 1 0 0-7.781 3.89 3.89 0 0 0 0 7.78Z"
        fill="currentColor"
      />
    </Icon>
  );
}
