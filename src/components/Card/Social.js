import { HStack, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { FaInstagram, FaTwitter, FaTelegram, FaFacebook } from "react-icons/fa";
function SocialCard({ profile, pos, right, top }) {
  return (
    <HStack textAlign="center" id="hehe" pos={pos} right={right} top={top}>
      <Link
        isexternal="true"
        href={`${profile?.instagram}` || `https://instagram.com`}
      >
        <IconButton
          aria-label="instagram"
          icon={<FaInstagram size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link
        isexternal="true"
        href={`${profile?.twitter}` || `https://twitter.com`}
      >
        <IconButton
          aria-label="twitter"
          icon={<FaTwitter size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link
        isexternal="true"
        href={`${profile?.telegram}` || `https://t.me/artzero_io`}
      >
        <IconButton
          aria-label="telegram"
          icon={<FaTelegram size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link
        isexternal="true"
        href={`${profile?.facebook}` || `https://www.facebook.com`}
      >
        <IconButton
          aria-label="facebook"
          icon={<FaFacebook size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
    </HStack>
  );
}

export default SocialCard;
