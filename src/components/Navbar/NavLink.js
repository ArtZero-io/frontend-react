import { Link, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const DesktopNavLink = ({ label, to, ...props }) => {
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
      _hover={{
        borderColor: "currentcolor",
        color: useColorModeValue("blue.600", "blue.200"),
      }}
    >
      {label}
    </Link>
  );
};
const MobileNavLink = ({ label = "", to = "", ...props }) => {
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
