import { HStack, IconButton, Link } from "@chakra-ui/react";
import React, { Fragment } from "react";
import {
  FaDiscord,
  FaInstagram,
  FaTwitter,
  FaTelegram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsMedium } from "react-icons/bs";

function SocialCard({ profile, pos, right, top }) {
  const iconList = {
    website: <FaGlobe size="1.5rem" />,
    telegram: <FaTelegram size="1.5rem" />,
    twitter: <FaTwitter size="1.5rem" />,
    facebook: <FaFacebook size="1.5rem" />,
    discord: <FaDiscord size="1.5rem" />,
    instagram: <FaInstagram size="1.5rem" />,
    mail: <MdEmail size="1.5rem" />,
    medium: <BsMedium size="1.5rem" />,
  };

  return (
    <HStack textAlign="center" pos={pos} right={right} top={top}>
      {profile.map((i, idx) => {
        return (
          <Fragment key={idx}>
            <Link isexternal="true" href={`${Object.values(i)[0]}`}>
              <IconButton
                aria-label={Object.keys(i)[0]}
                icon={iconList[Object.keys(i)[0]]}
                size="icon"
                variant="iconOutline"
              />
            </Link>
          </Fragment>
        );
      })}
    </HStack>
  );
}

export default SocialCard;
