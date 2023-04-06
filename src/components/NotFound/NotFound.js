import { Link } from "react-router-dom";
import * as ROUTES from "@constants/routes";
import { Box, Button, Fade, Heading } from "@chakra-ui/react";

const NotFound = ({
  heading = "Page not found!",
  description = "Come back soon! Or try to browse something for you on our marketplace",
  children,
  buttonHref = ROUTES.MARKETPLACE,
  buttonTitle = "Browse Marketplace",
  buttonOnClick,
  mt = "10rem",
}) => {
  return (
    <Fade in={true}>
      <Box mt={mt} textAlign="center" mx="auto">
        <Heading size="h1" mb={1}>
          {heading}
        </Heading>
        <Box my={12}>
          <Heading size="h5">{description}</Heading>
        </Box>
        {buttonTitle && (buttonHref || buttonOnClick) && (
          <>
            {buttonOnClick && (
              <Button variant="solid" type="button" onClick={buttonOnClick}>
                {buttonTitle}
              </Button>
            )}
            {buttonHref && !buttonOnClick && (
              <Link to={buttonHref}>
                <Button variant="solid" type="button">
                  {buttonTitle}
                </Button>
              </Link>
            )}
          </>
        )}
        {children}
      </Box>
    </Fade>
  );
};

export default NotFound;
