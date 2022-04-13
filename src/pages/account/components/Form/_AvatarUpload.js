import React from "react";
import { Avatar } from "@chakra-ui/react";

function AvatarUpload({ src, name = "avatar", size = "xl" }) {
  return <Avatar src={src} name={name} size={size} />;
}

export default AvatarUpload;
