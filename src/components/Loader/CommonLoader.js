// eslint-disable-next-line no-unused-vars
import { Heading, Center, Spinner, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const CommonLoader = ({
  loadingTime = 7,
  addText = "",
  size = "xl",
  minH,
  maxH,
  ...rest
}) => {
  return (
    <Center width="full" height="full" maxH={maxH} minH={minH}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {/* <Spinner
          p={5}
          thickness="4px"
          speed="0.5s"
          emptyColor="#333"
          color="#7ae7ff"
          size={size}
          {...rest}
        /> */}
        <AzeroAnimation loadingTime={loadingTime} />
        <Heading color="#fff" size="h6" px={5}>
          {addText}
        </Heading>
      </Stack>
    </Center>
  );
};

export default CommonLoader;

export const AzeroAnimation = ({ loadingTime }) => {
  console.log("AzeroAnimation loadingTime", loadingTime);
  const icon = {
    hidden: {
      opacity: 0.05,
      pathLength: 0.05,
      fill: "rgba(255, 255, 255, 0.05)",
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
        width: "70px",
        height: "70px",
        display: "flex",
        placeContent: "center",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.0)",
        borderRadius: "30px",
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        className="item"
        style={{
          width: "56%",
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
            default: { duration: loadingTime - 2, ease: "easeInOut" },
            fill: { duration: loadingTime, ease: [1, 0, 0.8, 1] },
          }}
        />
      </motion.svg>
    </div>
  );
};
