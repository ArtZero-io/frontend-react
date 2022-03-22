import { Container, ScaleFade } from "@chakra-ui/react";
import Navbar from "../Navbar/index";

const Layout = ({ children }) => {
  return (
    <Container maxW="container.xl" height="100%" px="0">
      <Navbar />
      <ScaleFade
        initialScale={0.5}
        in="true"
        transitionEnd={{ opacity: 0 }}
        delay={0.5}
      >
        <div>{children}</div>
      </ScaleFade>
    </Container>
  );
};

export default Layout;
