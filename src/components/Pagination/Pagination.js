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
  };

  const onEnterHandler = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      if (isNaN(e.target.value)) return toast.error("Number only!!!");
      if (e.target.value <= 0 || e.target.value > pagesCount)
        return toast.error("Out of page range!!!");
      setCurrentPage(e.target.value);
    }
  };

  return (
    <Stack maxW="25rem" textAlign="left">
      <Text color="brand.grayLight" ml="1">
        Page {currentPage} of {pagesCount}
      </Text>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={0}
          w="full"
        >
          <IconButton
            color="#888"
            mr={2}
            size="icon"
            icon={<ArrowLeftIcon />}
            variant="iconSolid"
            aria-label="go-start"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            _disabled={{
              bg: "#222",
              color: "#333",
              cursor: "not-allowed",
              _hover: {
                bg: "#7ae7ff",
              },
            }}
          />

          <PaginationPrevious
            p={0}
            mr={2}
            color="#888"
            bg="#222"
            _hover={{
              bg: "brand.blue",
            }}
          >
            <Square size="3.125rem">
              <ChevronLeftIcon
                _hover={{
                  color: "black",
                }}
                width="1.5rem"
                height="1.5rem"
                color="#888"
              />
            </Square>
          </PaginationPrevious>

          <PaginationNext
            p={0}
            mr={2}
            color="#888"
            bg="#222"
            _hover={{
              bg: "brand.blue",
              color: "black",
            }}
          >
            <Square size="3.125rem">
              <ChevronRightIcon
                _hover={{
                  color: "black",
                }}
                width="1.5rem"
                height="1.5rem"
                color="#888"
              />
            </Square>
          </PaginationNext>

          <IconButton
            color="#888"
            mr={2}
            size="icon"
            icon={<ArrowRightIcon />}
            variant="iconSolid"
            aria-label="go-end"
            onClick={() => setCurrentPage(pagesCount)}
            disabled={currentPage >= pagesCount}
            _disabled={{
              bg: "#222",
              color: "#333",
              cursor: "not-allowed",
              _hover: {
                bg: "#7ae7ff",
              },
            }}
          />
          <Input placeholder="Go to page" onKeyPress={onEnterHandler} />
        </PaginationContainer>
      </Pagination>
    </Stack>
  );
};

export default PaginationMP;
