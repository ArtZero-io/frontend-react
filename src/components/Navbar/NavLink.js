import { Link } from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const DesktopNavLink = ({ label, to, isExternal, ...props }) => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {isExternal && (
        <Link
          isExternal
          size="sm"
          fontFamily="Evogria, sans-serif"
          href={to}
          fontWeight="medium"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="2px"
          borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#ccc"}
        >
          {label}
        </Link>
      )}
      {!isExternal && (
        <Link
          as={ReactRouterLink}
          to={to}
          size="sm"
          fontFamily="Evogria, sans-serif"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="2px"
          borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#ccc"}
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
        <Link               bg="brand.grayDark"

          py="2rem"
          href={to}
          isExternal
          size="sm"
          fontFamily="Evogria, sans-serif"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="0"
          borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#ccc"}
        >
          {label}
        </Link>
      )}
      {!isExternal && (
        <Link               bg="brand.grayDark"

          py="2rem"
          as={ReactRouterLink}
          to={to}
          size="sm"
          fontFamily="Evogria, sans-serif"
          fontWeight="medium"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderBottom="0"
          borderColor="transparent"
          transition="all 0.2s"
          textTransform="uppercase"
          shadow="0px 4px 4px rgba(0, 0, 0, 0.75"
          _hover={{
            borderColor: "currentcolor",
            color: "brand.blue",
          }}
          color={path === to ? "brand.blue" : "#ccc"}
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
