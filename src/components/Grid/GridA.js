import { Link } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import AdvancedModeModal from "../../pages/account/collections/components/Modal/AdvancedMode";
import SimpleModeModal from "../../pages/account/collections/components/Modal/SimpleMode";
import { CollectionCard } from "../Card/Collection";
import * as ROUTES from "@constants/routes";

export default function GridA({ collections, variant = "my-collection" }) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

  useEffect(() => {
    controls.start("visible");
  }, [collections, controls]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{}}
      id="grid-item-div"
      style={{
        margin: "2.5rem auto",
        display: "grid",
        gridGap: "1.875rem",
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, 24.5625rem), 1fr))`,
        gridAutoRows: "31.25rem",
        gridAutoFlow: "dense",
      }}
    >
      {collections?.map((c, i) => (
        <GridItemA
          key={i}
          i={i}
          delayPerPixel={delayPerPixel}
          originOffset={originOffset}
          id="grid-item-a"
        >
          {variant === "my-collection" && Number(c.contractType) === 2 && (
            <SimpleModeModal mode="edit" id={c.index} pos={"absolute"} />
          )}

          {variant === "my-collection" && Number(c.contractType) === 1 && (
            <AdvancedModeModal mode="edit" id={c.index} />
          )}
          <Link
            as={ReactRouterLink}
            to={`${ROUTES.DETAIL_COLLECTION_BASE}/${c?.nftContractAddress}`}
            style={{ textDecoration: "none" }}
          >
            <CollectionCard {...c} variant={variant} />
          </Link>
        </GridItemA>
      ))}
    </motion.div>
  );
}

function GridItemA({ delayPerPixel, i, originIndex, originOffset, children }) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: (delayRef) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delayRef.current },
    }),
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [i, originIndex, originOffset]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [children, delayPerPixel, originOffset]);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      custom={delayRef}
      style={{ position: "relative", maxWidth: "24.5625rem" }}
    >
      {children}
    </motion.div>
  );
}
