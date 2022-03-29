import { Container, ScaleFade } from "@chakra-ui/react";
import Navbar from "../Navbar/Nav";

const Layout = ({ children }) => {
  return (
    <Container
      id="layout-container"
      maxW="container.3xl"
      height="100%"
      px={{ sm: "1"}}
    >
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
