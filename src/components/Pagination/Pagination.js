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
import toast from "react-hot-toast";

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
            size="icon"
            icon={<ArrowLeftIcon />}
            variant="iconSolid"
            aria-label="go-start"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          />
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
          <IconButton
            size="icon"
            icon={<ArrowRightIcon />}
            variant="iconSolid"
            aria-label="go-end"
            onClick={() => setCurrentPage(pagesCount)}
            disabled={currentPage >= pagesCount}
          />
          <Input placeholder="Go to page" onKeyPress={onEnterHandler} />
        </PaginationContainer>
      </Pagination>
    </Stack>
  );
};

export default PaginationMP;
