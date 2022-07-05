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

function SocialCard({ profile, pos, right, top, bottom, justifyContent }) {
  const iconList = {
    website: <FaGlobe size="24px" />,
    telegram: <FaTelegram size="24px" />,
    twitter: <FaTwitter size="24px" />,
    facebook: <FaFacebook size="24px" />,
    discord: <FaDiscord size="24px" />,
    instagram: <FaInstagram size="24px" />,
    mail: <MdEmail size="24px" />,
    medium: <BsMedium size="24px" />,
  };

  return (
    <HStack
      py="3"
      textAlign="center"
      pos={pos}
      right={right}
      top={top}
      bottom={bottom}
      justifyContent={justifyContent}
    >
      {profile?.map((i, idx) => {
        return (
          <Fragment key={idx}>
            {Object.values(i)[0] ? (
              <Link isExternal href={`${Object.values(i)[0] || null}`}>
                <IconButton
                  aria-label={Object.keys(i)[0]}
                  icon={iconList[Object.keys(i)[0]]}
                  size="icon"
                  variant="iconOutline"
                  _hover={{
                    bg: "#7ae7ff",
                    color: "black",
                    borderWidth: "0",
                  }}
                />
              </Link>
            ) : (
              <IconButton
                isDisabled
                aria-label={Object.keys(i)[0]}
                icon={iconList[Object.keys(i)[0]]}
                size="icon"
                variant="iconOutline"
                _hover={{
                  bg: "#7ae7ff",
                  color: "black",
                  borderWidth: "0",
                }}
              />
            )}
          </Fragment>
        );
      })}
    </HStack>
  );
}

export default SocialCard;
