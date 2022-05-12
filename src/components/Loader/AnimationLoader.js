import { Heading, Center, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimationLoader = ({
  loadingTime = 7,
  addText = "Please wait a moment...",
  minH = "4rem",
  maxH = "6rem",
}) => {
  return (
    <Center width="full" height="full" maxH={maxH} minH={minH}>
      <Stack direction="column" alignItems="center" spacing={2}>
        <AzeroAnimation loadingTime={loadingTime} />
        <Heading color="#7ae7ff" size="h6" px={5}>
          {addText}
        </Heading>
      </Stack>
    </Center>
  );
};

export default AnimationLoader;

export const AzeroAnimation = ({ loadingTime = 7 }) => {
  console.log("AzeroAnimation loadingTime", loadingTime);

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "#7ae7ff05",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "#7ae7ff",
    },
  };

  return (
    <div
      className="container"
      style={{
        width: "4.25rem",
        height: "4.25rem",
        display: "flex",
        placeContent: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        className="item"
        style={{
          width: "68%",
          overflow: "visible",
          stroke: "#7ae7ff",
          strokeWidth: 2,
          strokeLinejoin: "round",
          strokeLinecap: "round",
        }}
      >
        <motion.path
          d="M339.842 0V300.283H277.838V261.646H140.303L200.974 198.514H277.838V89.3674L67.128 300.283H0V272.816L272.816 0H339.842Z"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: (loadingTime || 7) - 5, ease: "easeInOut" },
            fill: { duration: loadingTime || 7, ease: [1, 0, 0.8, 1] },
          }}
        />
      </motion.svg>
    </div>
  );
};
