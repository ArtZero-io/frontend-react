import toast from "react-hot-toast";
import { Text, Stack, Square, Input, IconButton } from "@chakra-ui/react";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationContainer,
} from "@ajna/pagination";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const PaginationMP = ({
  isDisabled,
  currentPage,
  pagesCount,
  setCurrentPage,
}) => {
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    sessionStorage.setItem("scroll-position-current-page", nextPage);
  };

  const onEnterHandler = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      if (isNaN(e.target.value)) {
        return toast.error("Number only!!!");
      }

      if (e.target.value <= 0 || e.target.value > pagesCount) {
        return toast.error("Out of page range!!!");
      }

      setCurrentPage(e.target.value);
    }
  };

  return (
    <Stack
      maxW="25rem"
      textAlign="left"
      align={{ base: "start", xl: "space-between" }}
    >
      <Text color="brand.grayLight" ml="1" mb="19px">
        Page {currentPage} of {pagesCount}
      </Text>

      <Pagination
        isDisabled={isDisabled}
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          p={0}
          w="full"
          align="center"
          justify="space-between"
        >
          <IconButton
            mr={2}
            size="icon"
            color="#fff"
            variant="iconSolid"
            aria-label="go-start"
            icon={<ArrowLeftIcon />}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            _disabled={{
              bg: "#222",
              color: "#555",
              cursor: "not-allowed",
              _hover: {
                bg: "#7ae7ff",
              },
            }}
          />

          <PaginationPrevious
            className="previous-btn"
            p={0}
            mr={2}
            bg="#222"
            _hover={{
              bg: "brand.blue",
            }}
          >
            <Square size="3.125rem">
              <ChevronLeftIcon
                sx={{
                  ".previous-btn:hover &": {
                    color: "black",
                  },
                }}
                width="24px"
                height="24px"
                color="#fff"
              />
            </Square>
          </PaginationPrevious>

          <PaginationNext
            className="next-btn"
            p={0}
            mr={2}
            bg="#222"
            _hover={{
              bg: "brand.blue",
              color: "black",
            }}
          >
            <Square size="3.125rem">
              <ChevronRightIcon
                sx={{
                  ".next-btn:hover &": {
                    color: "black",
                  },
                }}
                width="24px"
                height="24px"
                color="#fff"
              />
            </Square>
          </PaginationNext>

          <IconButton
            color="#fff"
            mr={2}
            size="icon"
            icon={<ArrowRightIcon />}
            variant="iconSolid"
            aria-label="go-end"
            onClick={() => setCurrentPage(pagesCount)}
            disabled={currentPage >= pagesCount}
            _disabled={{
              bg: "#222",
              color: "#555",
              cursor: "not-allowed",
              _hover: {
                bg: "#7ae7ff",
              },
            }}
          />
          <Input
            fontSize="lg"
            pl="17px"
            placeholder="Go to page"
            onKeyPress={onEnterHandler}
            display={{ base: "none", md: "block" }}
          />
        </PaginationContainer>
      </Pagination>
    </Stack>
  );
};

export default PaginationMP;
