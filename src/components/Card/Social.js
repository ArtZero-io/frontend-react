/* eslint-disable no-unused-vars */
import { HStack, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

function SocialCard({ profile, pos, right, top }) {
  console.log("profile", profile);

  const iconList = {
    website: <FaGlobe size="1.5rem" />,
    telegram: <FaTelegram size="1.5rem" />,
    twitter: <FaTwitter size="1.5rem" />,
    facebook: <FaFacebook size="1.5rem" />,
    discord: <FaDiscord size="1.5rem" />,
    instagram: <FaInstagram size="1.5rem" />,
  };

  return (
    <HStack textAlign="center" pos={pos} right={right} top={top}>
      {profile.map((i, idx) => {
        return (
          <Link isexternal="true" href={`${Object.values(i)[0]}`}>
            <IconButton
              aria-label={Object.keys(i)[0]}
              icon={iconList[Object.keys(i)[0]]}
              size="icon"
              variant="iconOutline"
            />
          </Link>
        );
      })}

      {/* <Link isexternal="true" href={`${instagram}` || `https://instagram.com`}>
        <IconButton
          aria-label="instagram"
          icon={<FaInstagram size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link isexternal="true" href={`${twitter}` || `https://twitter.com`}>
        <IconButton
          aria-label="twitter"
          icon={<FaTwitter size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link isexternal="true" href={`${telegram}` || `https://t.me/artzero_io`}>
        <IconButton
          aria-label="telegram"
          icon={<FaTelegram size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link
        isexternal="true"
        href={`${facebook}` || `https://www.facebook.com`}
      >
        <IconButton
          aria-label="facebook"
          icon={<FaFacebook size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link>
      <Link isexternal="true" href={`${discord}` || `https://www.discord.com`}>
        <IconButton
          aria-label="discord"
          icon={<FaDiscord size="1.5rem" />}
          size="icon"
          variant="iconOutline"
        />
      </Link> */}
    </HStack>
  );
}

export default SocialCard;
