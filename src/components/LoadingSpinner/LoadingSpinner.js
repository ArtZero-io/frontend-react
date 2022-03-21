import { Center, Spinner, Stack } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

const LoadingSpinner = ({ addText = false, text, ...rest }) => {
  return (
    <Center>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Spinner
          thickness="8px"
          speed="0.85s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          {...rest}
        />
        {addText && (
          <Heading as="h4" size="md">
            {text ? text : 'Loading...'}
          </Heading>
        )}
      </Stack>
    </Center>
  )
}

export default LoadingSpinner
