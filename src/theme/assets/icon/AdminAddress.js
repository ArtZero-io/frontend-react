import { Icon } from "@chakra-ui/react";

export default function AdminAddressIcon({
  color = "#7ae7ff",
  width = "19px",
  height = "17px",
}) {
  return (
    <Icon
      className="admin-address-icon"
      width={width}
      height={height}
      viewBox="0 0 19 17"
      fill={color}
    >
      <path d="M18.023 15.89a9.902 9.902 0 0 0-5.504-4.446 5.906 5.906 0 1 0-6.038 0 9.901 9.901 0 0 0-5.504 4.447.632.632 0 0 0 0 .656.64.64 0 0 0 .566.328h15.914a.64.64 0 0 0 .566-.328.632.632 0 0 0 0-.656Z" />
    </Icon>
  );
}
