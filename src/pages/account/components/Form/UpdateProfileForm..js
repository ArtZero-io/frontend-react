import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  // Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  useInterval,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiCloudUpload } from "react-icons/hi";
import { FieldGroup } from "./FieldGroup";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleAttributes } from "@actions/account";
import { getProfile } from "@actions/account";
import toast from "react-hot-toast";
import { useSubstrateState } from "@utils/substrate";
import { encodeAddress } from "@polkadot/util-crypto";

const Form = ({ onClose }) => {
  const { profile } = useSelector((s) => s.account);
  const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  console.log("currentAccount1", currentAccount);
  console.log("currentAccount1", currentAccount.addressRaw);
  console.log("currentAccount3", encodeAddress(currentAccount.address));

  const [username, setUsername] = useState("");
  const [avatar] = useState(
    "https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  );
  const [bio, setBio] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const obj = {
    username,
    bio,
    facebook,
    twitter,
    telegram,
    instagram,
  };

  const objArr = Object.entries(obj).filter(([, value]) => {
    return value !== "";
  });
  const attributes = objArr.map((item) => item[0]);
  const values = objArr.map((item) => item[1]);
  console.log("profile", profile);

  useInterval(
    () => isSubmitted && dispatch(getProfile() && setIsSubmitted(false)),
    9000
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!attributes.length && !values.length) {
      return toast.error("You are not update anything!!!");
    }

    dispatch(setMultipleAttributes(attributes, values));
    setIsSubmitted(true);
    onClose();
  };

  return (
    <Box px={{ base: "4", md: "10" }} p="1" maxWidth="3xl" mx="auto">
      <form id="settings-form" onSubmit={onSubmitHandler}>
        <Stack spacing="4" divider={<StackDivider />}>
          {/* <Heading size="lg" as="h1" paddingBottom="4">
            Update Account
          </Heading> */}
          <FieldGroup title="Personal Info">
            <HStack width="full">
              <Stack direction="column" spacing="6" align="center" width="full">
                <Avatar size="xl" name="Alyssa Mall" src={avatar} />
                <Box>
                  <HStack spacing="5">
                    <Button size="xs" leftIcon={<HiCloudUpload />}>
                      Change photo
                    </Button>
                    <Button variant="ghost" colorScheme="red">
                      Delete
                    </Button>
                  </HStack>
                  <Text
                    fontSize="sm"
                    mt="3"
                    color={useColorModeValue("gray.500", "whiteAlpha.600")}
                  >
                    .jpg, .gif, or .png. Max file size 700K.
                  </Text>
                </Box>
              </Stack>
              <VStack width="full">
                <VStack width="full" spacing="6">
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      placeholder={profile?.username}
                      type="text"
                      maxLength={25}
                      value={username}
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </FormControl>
                </VStack>

                <VStack width="full" spacing="6">
                  <FormControl id="bio">
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                      placeholder={profile?.bio}
                      rows={2}
                      value={bio}
                      onChange={({ target }) => setBio(target.value)}
                    />
                    <FormHelperText>
                      Brief description for your profile.
                    </FormHelperText>
                  </FormControl>
                </VStack>

                <HStack width="full" spacing="6">
                  <FormControl id="facebook">
                    <FormLabel>Facebook</FormLabel>
                    <Input
                      placeholder={profile?.facebook}
                      type="text"
                      maxLength={48}
                      value={facebook}
                      onChange={({ target }) => setFacebook(target.value)}
                    />
                  </FormControl>

                  <FormControl id="twitter">
                    <FormLabel>Twitter</FormLabel>
                    <Input
                      placeholder={profile?.twitter}
                      type="text"
                      maxLength={48}
                      value={twitter}
                      onChange={({ target }) => setTwitter(target.value)}
                    />
                  </FormControl>
                </HStack>

                <HStack width="full" spacing="6">
                  <FormControl id="telegram">
                    <FormLabel>Telegram</FormLabel>
                    <Input
                      placeholder={profile?.telegram}
                      type="text"
                      maxLength={48}
                      value={telegram}
                      onChange={({ target }) => setTelegram(target.value)}
                    />
                  </FormControl>

                  <FormControl id="instagram">
                    <FormLabel>Instagram</FormLabel>
                    <Input
                      placeholder={profile?.instagram}
                      type="text"
                      maxLength={48}
                      value={instagram}
                      onChange={({ target }) => setInstagram(target.value)}
                    />
                  </FormControl>
                </HStack>
              </VStack>
            </HStack>
          </FieldGroup>
        </Stack>
        <FieldGroup mt="8">
          <Center width="full">
            <Button
              disabled={!objArr.length}
              size="sm"
              type="submit"
              colorScheme="blue"
              mx="3"
            >
              Save Changes
            </Button>
            <Button size="sm" variant="outline" onClick={() => onClose()}>
              Cancel
            </Button>
          </Center>
        </FieldGroup>
      </form>
    </Box>
  );
};

export default Form;
