import { HStack, IconButton, Link, useBreakpointValue } from "@chakra-ui/react";
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
  const iconSize = useBreakpointValue({ base: "20px", md: "24px" });

  const iconList = {
    mail: <MdEmail size={iconSize} />,
    medium: <BsMedium size={iconSize} />,
    website: <FaGlobe size={iconSize} />,
    twitter: <FaTwitter size={iconSize} />,
    discord: <FaDiscord size={iconSize} />,
    telegram: <FaTelegram size={iconSize} />,
    facebook: <FaFacebook size={iconSize} />,
    instagram: <FaInstagram size={iconSize} />,
  };

  return (
    <HStack
      py="3"
      pos={pos}
      top={top}
      right={right}
      bottom={bottom}
      textAlign="center"
      justifyContent={justifyContent}
    >
      {profile?.map((i, idx) => {
        return (
          <Fragment key={idx}>
            {Object.values(i)[0] ? (
              <Link isExternal href={`${Object.values(i)[0] || null}`}>
                <IconButton
                  variant="iconOutline"
                  width={["40px", "50px"]}
                  height={["40px", "50px"]}
                  aria-label={Object.keys(i)[0]}
                  icon={iconList[Object.keys(i)[0]]}
                  _hover={{
                    bg: "brand.blue",
                    color: "black",
                    borderWidth: "0",
                  }}
                />
              </Link>
            ) : (
              <IconButton
                isDisabled
                variant="iconOutline"
                width={["40px", "50px"]}
                height={["40px", "50px"]}
                aria-label={Object.keys(i)[0]}
                icon={iconList[Object.keys(i)[0]]}
                // size="icon"
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
