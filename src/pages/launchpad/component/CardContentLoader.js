import { Stack } from "@chakra-ui/react";
import React from "react";
import ContentLoader from "react-content-loader";

const CardContentLoader = (props) => {
  return (
    <Stack m="15px">
      <ContentLoader
        speed={1}
        width={280}
        height={450}
        viewBox="0 0 280 450"
        backgroundColor="#3b4455"
        foregroundColor="#111111"
        {...props}
      >
        {/* Border  */}
        <rect x="0" y="0" rx="0" ry="0" width="2" height="450" />
        <rect x="278" y="0" rx="0" ry="0" width="2" height="450" />
        <rect x="0" y="0" rx="0" ry="0" width="278" height="2" />
        <rect x="0" y="448" rx="0" ry="0" width="278" height="2" />

        {/* avatar */}
        <rect x="0" y="0" rx="0" ry="0" width="278" height="286" />

        {/* Progress */}
        <rect x="16" y="306" rx="0" ry="0" width="244" height="8" />

        {/* Desc */}
        <rect x="16" y="336" rx="0" ry="0" width="244" height="20" />

        {/* Button */}
        <rect x="16" y="370" rx="0" ry="0" width="244" height="50" />
      </ContentLoader>
    </Stack>
  );
};

export default CardContentLoader;
