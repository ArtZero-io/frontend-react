import { Icon } from "@chakra-ui/react";

export default function AzeroIcon({ fill = "#7AE7FF", ...rest }) {
  return (
    <Icon width="19" height="18" viewBox="0 0 19 18" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.51 7.778h-4.13L11.13.383a.262.262 0 0 0-.241-.158H8.11c-.105 0-.2.062-.241.157L4.62 7.778H.49a.264.264 0 0 0-.264.264v1.916c0 .146.118.263.264.263h3.056L.388 17.406a.263.263 0 0 0 .242.369h2.382a.264.264 0 0 0 .244-.161L9.5 2.872l6.244 14.742a.264.264 0 0 0 .244.161h2.382a.264.264 0 0 0 .242-.369l-3.158-7.185h3.056a.263.263 0 0 0 .264-.263V8.042a.264.264 0 0 0-.264-.264Z"
        fill={fill}
      />
    </Icon>
  );
}
