import { Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import InkWhale from "@theme/assets/icon/InkWhale";

const DesktopNavLink = ({ label, to, isExternal, ...props }) => {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <>
      {isExternal && (
        <Link
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          isExternal
          py="6px"
          fontSize="15px"
          lineHeight="shorter"
          fontFamily="Evogria, sans-serif"
          href={to}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="2px"
          borderColor={path === to ? "brand.blue" : "transparent"}
          // borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#fff"}
        >
          {label === "Stake2Earn" ? <InkWhale /> : "null"}
          <Text ml="8px">{label}</Text>
        </Link>
      )}
      {!isExternal && (
        <Link
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          as={ReactRouterLink}
          py="10px"
          to={to}
          fontSize="15px"
          lineHeight="shorter"
          fontFamily="Evogria, sans-serif"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="2px"
          // borderColor="transparent"
          borderColor={path === to ? "brand.blue" : "transparent"}
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#fff"}
        >
          {label}
        </Link>
      )}
    </>
  );
};
const MobileNavLink = ({ label = "", to = "", isExternal, ...props }) => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {isExternal && (
        <Link
          bg="black"
          py="5px"
          px="23px"
          href={to}
          isExternal
          fontSize="24px"
          fontFamily="Evogria, sans-serif"
          display="flex"
          alignItems="center"
          justifyContent="start"
          borderBottom="0"
          // borderColor="transparent"
          borderColor={path === to ? "brand.blue" : "transparent"}
          transition="all 0.2s"
          textTransform="uppercase"
          textAlign="left"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#fff"}
        >
          {label}
        </Link>
      )}
      {!isExternal && (
        <Link
          bg="black"
          py="5px"
          px="23px"
          as={ReactRouterLink}
          to={to}
          fontSize="24px"
          fontFamily="Evogria, sans-serif"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          justifyContent="start"
          borderBottom="0"
          borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#fff"}
        >
          {label}
        </Link>
      )}
    </>
  );
};

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
};
