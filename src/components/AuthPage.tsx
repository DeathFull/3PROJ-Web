import { Button, Center, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

function AuthPage() {
  return (
    <>
      <Stack>
        <Center mb={3}>
          <Heading size={"lg"}>Connectez-vous à UniFinance</Heading>
        </Center>
        <Button m={"auto"} bg={"none"} border="solid black">
          <Flex align="center">
            <Icon as={FcGoogle} boxSize={6} mr={2} />
            <Heading size="md">Connectez-vous à Google</Heading>
          </Flex>
        </Button>
      </Stack>
    </>
  );
}

export default AuthPage;
