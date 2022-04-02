import { Text, Stack, Square, Button, Input } from "@chakra-ui/react";
import {
  Pagination,
  // usePagination,
  // PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationContainer,
  // PaginationPageGroup,
  // PaginationSeparator,
} from "@ajna/pagination";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import toast from "react-hot-toast";

// import { NUMBER_PER_PAGE } from "../../constants/index";

const PaginationMP = ({
  isDisabled,
  currentPage,
  pagesCount,
  setCurrentPage,
}) => {
  //TODO effects for test page navigation, thay API sau

  // page change handlers
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
    <Stack maxW="25rem">
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
          <Button
            disabled={currentPage === 1}
            variant="icon"
            _hover={{
              bg: "brand.blue",
              color: "black",
            }}
            onClick={() => setCurrentPage(1)}
          >
            <Square size="3.125rem">
              <ArrowLeftIcon size="24px" />
            </Square>
          </Button>
          <PaginationPrevious
            p={0}
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
                color="white"
              />
            </Square>
          </PaginationPrevious>
          <PaginationNext
            p={0}
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
                color="white"
              />
            </Square>
          </PaginationNext>
          <Button
            variant="icon"
            _hover={{
              bg: "brand.blue",
              color: "black",
            }}
            onClick={() => setCurrentPage(pagesCount)}
            disabled={currentPage === pagesCount}
          >
            <Square size="50px">
              <ArrowRightIcon size="18px" />
            </Square>
          </Button>{" "}
          <Input placeholder="Go to page" onKeyPress={onEnterHandler} />
        </PaginationContainer>
      </Pagination>
    </Stack>
  );
};

export default PaginationMP;
