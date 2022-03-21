import {
  Link,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa'

export const UserInfo = props => {
  const { facebook, twitter, telegram, instagram, ...stackProps } = props
  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      spacing={{ base: '24', sm: '6' }}
      mt="4"
      fontSize="sm"
      fontWeight="medium"
      justify="center"
      color={useColorModeValue('blue.600', 'blue.300')}
      {...stackProps}
    >
      <HStack>
        <Icon as={FaFacebook} />
        <Link href={`www.facebook.com/${facebook}`} isExternal>
          <Text> {facebook}</Text>
        </Link>
      </HStack>
      <HStack>
        <Icon as={FaTwitter} />
        <Link href={`twitter.com/${twitter}`} isExternal>
          <Text>{twitter}</Text>
        </Link>
      </HStack>
      <HStack>
        <Icon as={FaTelegram} />
        <Link href={`t.me/${telegram}`} isExternal>
          <Text>{telegram}</Text>
        </Link>
      </HStack>
      <HStack>
        <Icon as={FaInstagram} />
        <Link href={`instagram.com/${instagram}`} isExternal>
          <Text>{instagram}</Text>
        </Link>
      </HStack>
    </Stack>
  )
}
