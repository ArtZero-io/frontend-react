import { Heading, Center, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimationLoader = ({
  minH = "4rem",
  maxH = "6rem",
  loadingTime = 5,
  addText = "wait a moment...",
  ...rest
}) => {
  return (
    <Center width="full" height="full" maxH={maxH} minH={minH} {...rest}>
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

export const AzeroAnimation = ({ loadingTime = 5 }) => {
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
        display: "flex",
        width: "4.25rem",
        height: "4.25rem",
        overflow: "hidden",
        placeContent: "center",
        background: "transparent",
      }}
    >
      <motion.svg
        className="item"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "68%",
          strokeWidth: 2,
          stroke: "#7ae7ff",
          overflow: "visible",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <motion.path
          d="M339.842 0V300.283H277.838V261.646H140.303L200.974 198.514H277.838V89.3674L67.128 300.283H0V272.816L272.816 0H339.842Z"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: { duration: loadingTime * 0.8, ease: "easeInOut" },
            fill: { duration: loadingTime, ease: [1, 0, 0.8, 1] },
          }}
        />
      </motion.svg>
    </div>
  );
};
