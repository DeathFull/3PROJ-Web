import { Center, Heading, Stack } from "@chakra-ui/react";
import CreateAccount from "./auth/CreateAccount.tsx";

function AuthPage() {
  return (
    <>
      <Stack justifyContent={"center"} mx={"auto"}>
        <Center mb={3}>
          <Heading size={"lg"}>Inscrivez-vous à UniFinance</Heading>
        </Center>
        <CreateAccount />
      </Stack>
    </>
  );
}

export default AuthPage;
