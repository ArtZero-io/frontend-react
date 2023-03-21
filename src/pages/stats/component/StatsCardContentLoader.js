import { Stack, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import ContentLoader from "react-content-loader";

const StatsCardContentLoader = (props) => {
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");
  
  return (
    <Stack m="15px">
      {isBigScreen ? (
        <ContentLoader
          speed={3}
          width={270}
          height={131}
          viewBox="0 0 270 131"
          backgroundColor="#4a5568"
          foregroundColor="#1A202C"
          {...props}
        >
          <rect x="5" y="0" rx="0" ry="0" width="80" height="27" />
          <rect x="45" y="50" rx="0" ry="0" width="170" height="50" />
          <rect x="224" y="65" rx="0" ry="0" width="20" height="20" />
        </ContentLoader>
      ) : (
        <ContentLoader
          speed={3}
          width={330}
          height={96}
          viewBox="0 0 330 96"
          backgroundColor="#4a5568"
          foregroundColor="#1A202C"
          {...props}
        >
          <rect x="5" y="0" rx="0" ry="0" width="80" height="24" />
          <rect x="170" y="35" rx="0" ry="0" width="100" height="35" />
          <rect x="284" y="42" rx="0" ry="0" width="20" height="20" />
        </ContentLoader>
      )}
    </Stack>
  );
};

export default StatsCardContentLoader;
