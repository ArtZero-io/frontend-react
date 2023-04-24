import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Flex,
  HStack,
} from '@chakra-ui/react';

import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share/';
import { BsShare } from 'react-icons/bs';

function SocialShare({
  width = '50px',
  height = '50px',
  shareUrl = 'https://artzero.io/',
  title = 'ArtZero.io - NFT Marketplace for Aleph Zero Blockchain',
}) {
  return (
    <>
      <Flex justifyContent="center" mt={4}>
        <Popover trigger="hover" placement="bottom-end" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More social share options"
              icon={<BsShare />}
              variant="solid"
              width={width}
              height={height}
              // w="fit-content"
            />
          </PopoverTrigger>
          <PopoverContent
            borderRadius={0}
            w="fit-content"
            _focus={{ boxShadow: 'none' }}
          >
            <PopoverArrow />

            <PopoverBody>
              <HStack>
                <Button variant="ghost" px="9px">
                  <FacebookShareButton url={shareUrl} quote={title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>{' '}
                </Button>

                <Button variant="ghost" px="9px">
                  <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                  >
                    <FacebookMessengerIcon size={32} round />
                  </FacebookMessengerShareButton>
                </Button>

                <Button variant="ghost" px="9px">
                  <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </Button>

                <Button variant="ghost" px="9px">
                  <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </Button>

                <Button variant="ghost" px="9px">
                  <EmailShareButton url={shareUrl} subject={title}>
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
}

export default SocialShare;
