import { Icon } from "@chakra-ui/react";

export default function ProjectInfoIcon({
  color = "#7ae7ff",
  width = "15px",
  height = "19px",
}) {
  return (
    <Icon
      className="project-info-icon"
      width={width}
      height={height}
      viewBox="0 0 15 19"
      fill={color}
    >
      <path d="M14.53 5.251 9.936.657A.664.664 0 0 0 9.47.47H1.594A1.312 1.312 0 0 0 .28 1.78v14.44a1.312 1.312 0 0 0 1.313 1.312h11.812a1.312 1.312 0 0 0 1.313-1.312V5.72a.665.665 0 0 0-.189-.468Zm-5.06.469V2.11l3.61 3.61H9.47Z" />
    </Icon>
  );
}
