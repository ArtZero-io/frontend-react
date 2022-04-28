import { Link } from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const DesktopNavLink = ({ label, to, ...props }) => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);

  }, [location.pathname]);
  return (
    <Link
      size="sm" fontFamily='Evogria, sans-serif'
      as={ReactRouterLink}
      to={to}
      fontWeight="medium"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderBottom="2px"
      borderColor="transparent"
      transition="all 0.2s"
      textTransform="uppercase"
      _hover={{
        borderColor: "currentcolor",
        color: "brand.blue",
      }}
      color= {path == to ? "white" : null}
    >
      {label}
    </Link>
  );
};
const MobileNavLink = ({ label = "", to = "", ...props }) => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <Link
      as={ReactRouterLink}
      to={to}
      fontWeight="medium"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderBottom="2px"
      borderColor="transparent"
      transition="all 0.2s"
      color= {path == to ? "white" : null}
      // _hover={{
      //   borderColor: 'currentcolor',
      //   color: useColorModeValue('blue.600', 'blue.200'),
      // }}
    >
      {label}
    </Link>
  );
};

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
};
